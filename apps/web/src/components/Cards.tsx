import React from 'react';
import '../app/dashboard.css';

const Cards = () => {
  return (
    <div className="Cards">
      <div className="ParentsCard">
        <div className="Card">
          <div className="Title">List of my event</div>
        </div>
        <div className="Card">
          <div className="Title">Attendee Registration</div>
        </div>
        <div className="Card">
          <div className="Title">Transaction</div>
        </div>
      </div>
    </div>
  );
};

export default Cards;
