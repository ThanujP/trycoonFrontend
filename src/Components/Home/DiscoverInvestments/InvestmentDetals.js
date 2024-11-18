// InvestmentDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const InvestmentDetail = () => {
    const { investmentType } = useParams();

    const investmentContent = {
        "24-hour-market": "Information about the 24 Hour Market, providing access to global markets around the clock.",
        "tradable-crypto": "Details on Tradable Crypto assets, including popular cryptocurrencies like Bitcoin, Ethereum, and more.",
        "ipo-access": "IPO Access insights and information, offering opportunities to invest in newly listed companies.",
        "altcoins": "Overview of the Altcoins market, including alternative cryptocurrencies to Bitcoin.",
        "100-most-popular": "The 100 most popular investments, featuring high-demand stocks and assets across various sectors.",
        "daily-movers": "Daily Movers, showcasing stocks with significant price changes in the last trading day.",
        "cannabis": "Information on the Cannabis sector, including investments in companies related to medical and recreational cannabis.",
        "upcoming-earnings": "Upcoming Earnings reports for major companies, giving insights into expected financial performance.",
        "technology": "Investments in the Technology sector, covering companies focused on software, hardware, and innovation.",
        "tech-media-telecom": "Tech, Media, & Telecom investments, including companies in digital media, telecommunications, and technology services.",
        "etfs": "Exchange-Traded Funds (ETFs) providing diverse exposure to various industries and asset classes.",
        "energy": "Investments in the Energy sector, covering oil, gas, renewable energy, and utilities.",
        "pharma": "Pharmaceuticals sector investments, focusing on companies engaged in drug development and healthcare.",
        "growth-value-etfs": "Growth & Value ETFs offering balanced investment options between growth stocks and value stocks.",
        "newly-listed-crypto": "Newly Listed Crypto assets, featuring the latest additions to the cryptocurrency market.",
        "energy-water": "Energy & Water sector investments, covering utilities, renewables, and infrastructure.",
        "healthcare": "Healthcare sector investments, focusing on companies in pharmaceuticals, biotechnology, and medical devices.",
        "real-estate": "Real Estate sector investments, including REITs and property management companies.",
        "consumer-goods": "Consumer Goods sector, covering companies involved in the production and distribution of goods for everyday use.",
        "business": "Business sector investments, focusing on companies providing professional services and solutions.",
        "software": "Investments in the Software industry, including companies that create software solutions for businesses and consumers.",
        "automotive": "Automotive sector investments, covering car manufacturers, parts suppliers, and electric vehicle companies.",
        "banking": "Banking sector investments, including commercial banks, investment banks, and financial institutions.",
        "sector-etfs": "Sector ETFs offering focused investments in specific industries or sectors.",
        "real-estate-etfs": "Real Estate ETFs providing exposure to real estate markets and property investments.",
        "finance": "Finance sector investments, covering companies in banking, asset management, and financial services.",
        "bond-etfs": "Bond ETFs, offering exposure to various types of bonds, including corporate and government bonds.",
        "healthcare-supplies": "Healthcare Supplies sector investments, focusing on companies that manufacture medical equipment and supplies.",
    };
    

    return (
        <div style={{ padding: '20px' }}>
            <h2>{investmentType.replace(/-/g, ' ')}</h2>
            <p>{investmentContent[investmentType] || "No details available for this investment."}</p>
        </div>
    );
};

export default InvestmentDetail;
