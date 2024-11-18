import React from "react";
import "./App.css";
import Home from "./Components/Home/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
import Test from "./Components/Test/Test";
import Login from "./Components/Auth/Login/Login";
import Signup from "./Components/Auth/Signup/Signup";
import ProfileComponent from "./Components/Auth/Profile/ProfileComponent";
import LogoutComponent from "./Components/Home/DropDowns/LogoutComponent";
import AlpacaNewsComponent from "./Components/StockNews/alpacanewsComponent";
import InvestmentDetail from "./Components/Home/DiscoverInvestments/InvestmentDetals";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AlpacaNewsComponent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/test" element={<Test />} />
          <Route path="/profile" element={<ProfileComponent />} />
          <Route path="/:investmentType" element={<InvestmentDetail />} />
          <Route path="/logout" element={<LogoutComponent />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;