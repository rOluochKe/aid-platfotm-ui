import React from "react";
import "../../styles/counter.css";

const Counter = ({ request, user }) => {
  return (
    <div className="counter">
      <div className="container">
        <div className="row mt-4 mb-4">
          <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h1><strong>{request.unfulfilled}</strong></h1>
                <h4>Unfulfilled Requests</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h1><strong>{request.fulfilled}</strong></h1>
                <h4>Fulfilled Requests</h4>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-2">
            <div className="card">
              <div className="card-body">
                <h1><strong>{user}</strong></h1>
                <h4>Registered Users</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
