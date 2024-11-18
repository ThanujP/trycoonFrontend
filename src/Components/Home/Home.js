import React from 'react';
import './Home.css'; // Import your CSS
import Welcome from '../Welcome';
import DiscoverInvestments from './DiscoverInvestments/DiscoverInvestments';
import Learn from './Learn/Learn';
import ReadNews from './ReadNews/ReadNews';
import Lists from './lists/Lists';
import AccountDropDown from './DropDowns/AccountDropDown';

function App() {
  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={require('../trycoon.png')} alt="Logo" />
          <a href="/">
            <h2>TryCOON</h2>
          </a>
        </div>

        <div className="search-box">
          <input type="text" placeholder="Search..." />
        </div>

        <div className="nav-items">
          <div>Rewards</div>
          <div>Investing</div>
          <div>Notifications</div>
          <AccountDropDown />
        </div>
      </header>

      <div className="main-content">
        <div className="welcome-container">
          <Welcome />
        </div>
        <div className="content-column">
          <DiscoverInvestments />
          <Learn />
          <ReadNews />
        </div>
        <div className="lists-container">
          <Lists />
        </div>
      </div>
    </div>
  );
}

export default App;
