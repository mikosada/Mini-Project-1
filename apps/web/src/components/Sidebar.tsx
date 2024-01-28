'use client';

import React from 'react';
import '../app/dashboard.css';
import { useState } from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        <div className={'menuItem active'}>
          <div>Event Dashboard</div>
        </div>
        <div className={'menuItem active'}>
          <div>Create Event</div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
