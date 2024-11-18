import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Move symbols and timeframeConfig outside the component
const symbols = ['TSLA', 'NVDA', 'AAPL', 'LCID', 'AMZN', 'RIVN', 'MSFT'];
const timeframeConfig = {
    '1D': { function: 'TIME_SERIES_INTRADAY', interval: '5min' },
    '1W': { function: 'TIME_SERIES_INTRADAY', interval: '30min' },
    '1M': { function: 'TIME_SERIES_DAILY' },
    '3M': { function: 'TIME_SERIES_DAILY' },
    'YTD': { function: 'TIME_SERIES_DAILY' },
    '1Y': { function: 'TIME_SERIES_MONTHLY' },
    '5Y': { function: 'TIME_SERIES_MONTHLY' },
    'MAX': { function: 'TIME_SERIES_MONTHLY' },
};

const StockTimeframeSelector = () => {
    const [selectedTimeframe, setSelectedTimeframe] = useState('1D');
    const [stockData, setStockData] = useState({});
    const [error, setError] = useState(null);

    const API_KEY = 'U1CFV27T0GIHYCWJ';

    useEffect(() => {
        const fetchAllStockData = async () => {
            try {
                setError(null);
                const config = timeframeConfig[selectedTimeframe];
                const stockDataResponses = await Promise.all(
                    symbols.map(symbol =>
                        axios.get(`https://www.alphavantage.co/query`, {
                            params: {
                                function: config.function,
                                symbol: symbol,
                                ...(config.interval && { interval: config.interval }),
                                apikey: API_KEY,
                            },
                        }).catch((error) => {
                            console.error(`Error fetching data for ${symbol}:`, error);
                            return { data: null }; // Return placeholder on failure
                        })
                    )
                );
    
                const newStockData = {};
                stockDataResponses.forEach((response, index) => {
                    const symbol = symbols[index];
                    console.log(`Response for ${symbol}:`, response.data); // Log response
    
                    if (response.data && response.data["Note"]) {
                        throw new Error(response.data["Note"]); // Rate limit or API notice
                    }
    
                    const timeSeriesKey = response.data && Object.keys(response.data).find(key => key.includes('Time Series'));
                    const data = response.data && response.data[timeSeriesKey];
                    if (!data) {
                        console.warn(`No data found for ${symbol}`);
                        return; // Skip this symbol if no data is found
                    }
    
                    const processedData = Object.entries(data).map(([date, value]) => ({
                        date,
                        open: parseFloat(value['1. open']),
                        close: parseFloat(value['4. close']),
                    }));
                    newStockData[symbol] = processedData;
                });
    
                setStockData(newStockData);
            } catch (error) {
                console.error("Error fetching stock data:", error);
                setError(error.message || "Failed to fetch stock data. Please try again later.");
            }
        };
    
        fetchAllStockData();
    }, [selectedTimeframe, API_KEY]);
    
    

    const styles = {
        container: {
            backgroundColor: '#1c1c1c',
            color: '#ffffff',
            padding: '15px',
            borderRadius: '10px',
            width: '100%',
            fontFamily: 'Arial, sans-serif',
        },
        tabs: {
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '10px',
        },
        tab: (isActive) => ({
            fontSize: '14px',
            padding: '10px 15px',
            cursor: 'pointer',
            color: isActive ? '#00FF00' : '#ffffff',
            borderBottom: isActive ? '2px solid #00FF00' : 'none',
        }),
        stockList: {
            maxHeight: '400px',
            overflowY: 'scroll',
        },
        stockSymbol: {
            fontWeight: 'bold',
            fontSize: '16px',
            marginBottom: '5px',
        },
        stockItem: {
            padding: '10px 0',
            borderBottom: '1px solid #333',
            display: 'flex',
            justifyContent: 'space-between',
        },
    };

    const renderTabs = () => (
        <div style={styles.tabs}>
            {Object.keys(timeframeConfig).map((timeframe) => (
                <span
                    key={timeframe}
                    style={styles.tab(selectedTimeframe === timeframe)}
                    onClick={() => setSelectedTimeframe(timeframe)}
                >
                    {timeframe}
                </span>
            ))}
        </div>
    );

    return (
        <div style={styles.container}>
            {/* Timeframe Tabs */}
            {renderTabs()}

            {/* Error Message */}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            {/* Stock Data List */}
            <div style={styles.stockList}>
                {symbols.map(symbol => (
                    <div key={symbol}>
                        <div style={styles.stockSymbol}>{symbol}</div>
                        {stockData[symbol] ? (
                            stockData[symbol].map((data, index) => (
                                <div key={index} style={styles.stockItem}>
                                    <span>{data.date}</span>
                                    <span>Open: ${data.open.toFixed(2)}</span>
                                    <span>Close: ${data.close.toFixed(2)}</span>
                                </div>
                            ))
                        ) : (
                            <p>Loading data...</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StockTimeframeSelector;
