import React from 'react';
import './user.scss';

const User = () => {
  return (
    <div className="user-info">
      <div className='container'>
        <div className='row'>
          <div className="section-title text-center pb-4">
            <h2>Choose a Plan</h2>
            <p>Find one that works for you</p>
          </div>
              <div md={4} className="col mb-4" >
                <div className="plan-card p-4">
                  <div>
                    <h5 className="card-title">plan.name</h5>
                    <p className="price">$plan.amount <span className="interval">/plan.interval</span></p>
                    <ul className="features px-4">
                      <li>plan.description</li>
                    </ul>
                  </div>
                  <button href={`/payment?planId=planid`} className="btn btn-primary user-btn">
                    Purchase
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-center align-items-center h-100"> 
                <div className="spinner-border" role="status"> 
                  <span className="visually-hidden">Loading...</span> 
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default User;
