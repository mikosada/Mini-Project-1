'use client';

import React from 'react';
import '../app/dashboard.css';
import { useState } from 'react';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="menu">
        <div className={'menuItem active'}>
          <div>test 1</div>
          <span>test</span>
        </div>
        <div className={'menuItem active'}>
          <div>test 1</div>
          <span>test</span>
        </div>
        <div className={'menuItem active'}>
          <div>test 1</div>
          <span>test</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
