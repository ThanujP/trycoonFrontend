import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./alpacanewcomponent.css"

const AlpacaNewsComponent = () => {
    const [stockData, setStockData] = useState(null);
    const [marketData, setMarketData] = useState(null);
    const [assetInfo, setAssetInfo] = useState(null);
    const [error, setError] = useState(null);
    const [stockSymbol, setStockSymbol] = useState('AAPL');
    const [assetSymbol, setAssetSymbol] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const BASE_URL = 'http://127.0.0.1:8000/api/trycoon/api';

    useEffect(() => {
      fetchMarketData();
    }, []);
  
    const fetchStockData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/stock-data/?symbol=${stockSymbol}`);
        setStockData(response.data.stock_data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch stock data');
        setStockData(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchMarketData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/market-data/`);
        setMarketData(response.data.market_data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch market data');
        setMarketData(null);
      } finally {
        setIsLoading(false);
      }
    };
  
    const fetchAssetInfo = async () => {
      setIsLoading(true);
      try {
        const response = await axios.post(`${BASE_URL}/stock-news/`, { symbol: assetSymbol });
        if (response.data.error) {
          setError(response.data.error);
          setAssetInfo(null);
        } else {
          setAssetInfo(response.data.asset_info);
          setError(null);
        }
      } catch (err) {
        setError('Failed to fetch asset information');
        setAssetInfo(null);
      } finally {
        setIsLoading(false);
      }
    };

    const handleStockSubmit = async (e) => {
      e.preventDefault();
      await fetchStockData();
    };

    const handleAssetSubmit = async (e) => {
      e.preventDefault();
      await fetchAssetInfo();
    };

  return (
    <div className="alpaca-news-container">
      <h1 className="title">Market and Stock Information</h1>
      
      {error && <div className="error-message">{error}</div>}
      {isLoading && <div className="loading-message">Loading...</div>}

      <div className="stock-data-section">
        <h2>Stock Information</h2>
        <form onSubmit={handleStockSubmit} className="stock-form">
          <label htmlFor="stockSymbol">Enter Stock Symbol:</label>
          <input 
            type="text" 
            id="stockSymbol" 
            value={stockSymbol}
            onChange={(e) => setStockSymbol(e.target.value.toUpperCase())}
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Get Stock Info'}
          </button>
        </form>

        {stockData && (
          <div className="stock-data-card">
            <h3>{stockData.name} ({stockData.ticker})</h3>
            <p><strong>Market Cap:</strong> ${stockData.market_cap?.toFixed(2) || 'N/A'}</p>
            <p><strong>Industry:</strong> {stockData.sic_description || 'N/A'}</p>
            <p><strong>Website:</strong> {stockData.homepage_url ? (
              <a href={stockData.homepage_url} target="_blank" rel="noopener noreferrer">{stockData.homepage_url}</a>
            ) : 'N/A'}</p>
            {stockData.branding?.logo_url && (
              <img src={stockData.branding.logo_url} alt="Company Logo" className="company-logo" />
            )}
          </div>
        )}
      </div>

      {marketData && (
        <div className="market-data-card">
          <h2>Market Information</h2>
          <p><strong>Market:</strong> {marketData.market || 'N/A'}</p>
          <p><strong>After Hours:</strong> {marketData.afterHours ? 'Open' : 'Closed'}</p>
          <p><strong>Server Time:</strong> {marketData.serverTime || 'N/A'}</p>
        </div>
      )}

      <div className="asset-info-section">
        <h2>Alpaca Asset Information</h2>
        <form onSubmit={handleAssetSubmit} className="asset-form">
          <label htmlFor="assetSymbol">Enter Asset Symbol:</label>
          <input 
            type="text" 
            id="assetSymbol" 
            value={assetSymbol}
            onChange={(e) => setAssetSymbol(e.target.value.toUpperCase())}
            required 
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Get Asset Info'}
          </button>
        </form>

        {assetInfo && (
          <div className="asset-info-card">
            <h3>Asset Information for {assetInfo.symbol}</h3>
            <table>
              <tbody>
                <tr><th>Asset ID</th><td>{assetInfo.id || 'N/A'}</td></tr>
                <tr><th>Name</th><td>{assetInfo.name || 'N/A'}</td></tr>
                <tr><th>Exchange</th><td>{assetInfo.exchange || 'N/A'}</td></tr>
                <tr><th>Class</th><td>{assetInfo.asset_class || 'N/A'}</td></tr>
                <tr><th>Status</th><td>{assetInfo.status || 'N/A'}</td></tr>
                <tr><th>Tradable</th><td>{assetInfo.tradable ? 'Yes' : 'No'}</td></tr>
                <tr><th>Marginable</th><td>{assetInfo.marginable ? 'Yes' : 'No'}</td></tr>
                <tr><th>Shortable</th><td>{assetInfo.shortable ? 'Yes' : 'No'}</td></tr>
                <tr><th>Easy to Borrow</th><td>{assetInfo.easy_to_borrow ? 'Yes' : 'No'}</td></tr>
                <tr><th>Fractionable</th><td>{assetInfo.fractionable ? 'Yes' : 'No'}</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AlpacaNewsComponent;