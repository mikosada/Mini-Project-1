import React from 'react';
import '../app/dashboard.css';
import Cards from './Cards';
import Statistic from './Statistic';

const MainDashboard = () => {
  return (
    <div className="MainDash">
      <p className="h1">Event Management Dashboard</p>
      <Cards></Cards>
      <Statistic />
    </div>
  );
};

export default MainDashboard;
