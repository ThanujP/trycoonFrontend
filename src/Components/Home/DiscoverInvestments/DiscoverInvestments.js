import React from 'react';
import './DiscoverInvestments.css'; // Import the CSS for the component
import { Link } from 'react-router-dom';
const DiscoverInvestments = () => {
  return (
    <div className="discover-investments">
      <h2>Discover Investments</h2>
      <div className="investment-options">
        <Link to="/24-hour-market">
          <span>24 Hour Market</span>
        </Link>
        <Link to="/tradable-crypto">
          <span>Tradable Crypto</span>
        </Link>
        <Link to="/ipo-access">
          <span>IPO Access</span>
        </Link>
        <Link to="/altcoins">
          <span>Altcoins</span>
        </Link>
        <Link to="/100-most-popular">
          <span>100 Most Popular</span>
        </Link>
        <Link to="/daily-movers">
          <span>Daily Movers</span>
        </Link>
        <Link to="/cannabis">
          <span>Cannabis</span>
        </Link>
        <Link to="/upcoming-earnings">
          <span>Upcoming Earnings</span>
        </Link>
        <Link to="/technology">
          <span>Technology</span>
        </Link>
        <Link to="/tech-media-telecom">
          <span>Tech, Media, & Telecom</span>
        </Link>
        <Link to="/etfs">
          <span>ETFs</span>
        </Link>
        <Link to="/energy">
          <span>Energy</span>
        </Link>
        <Link to="/pharma">
          <span>Pharma</span>
        </Link>
        <Link to="/growth-value-etfs">
          <span>Growth & Value ETFs</span>
        </Link>
        <Link to="/newly-listed-crypto">
          <span>Newly Listed Crypto</span>
        </Link>
        <Link to="/energy-water">
          <span>Energy & Water</span>
        </Link>
        <Link to="/healthcare">
          <span>Healthcare</span>
        </Link>
        <Link to="/real-estate">
          <span>Real Estate</span>
        </Link>
        <Link to="/consumer-goods">
          <span>Consumer Goods</span>
        </Link>
        <Link to="/business">
          <span>Business</span>
        </Link>
        <Link to="/software">
          <span>Software</span>
        </Link>
        <Link to="/automotive">
          <span>Automotive</span>
        </Link>
        <Link to="/banking">
          <span>Banking</span>
        </Link>
        <Link to="/sector-etfs">
          <span>Sector ETFs</span>
        </Link>
        <Link to="/real-estate-etfs">
          <span>Real Estate ETFs</span>
        </Link>
        <Link to="/finance">
          <span>Finance</span>
        </Link>
        <Link to="/bond-etfs">
          <span>Bond ETFs</span>
        </Link>
        <Link to="/healthcare-supplies">
          <span>Healthcare Supplies</span>
        </Link>
      </div>
    </div>
  );
};

export default DiscoverInvestments;
