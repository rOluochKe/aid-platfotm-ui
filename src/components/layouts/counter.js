import React from "react";
import "../../styles/counter.css";

const Counter = ({ request, user }) => {
  return (
    <div className="counter">
      <div className="container d-none d-md-block">
        <div className="row">
          <div className="col-md-4">
            <p className="count-num">{request.unfulfilled}</p>
            <p className="count-title">
              <small>Unfulfilled Requests</small>
            </p>
          </div>
          <div className="col-md-4">
            <p className="count-num">{request.fulfilled}</p>
            <p className="count-title">
              <small>Fulfilled Requests</small>
            </p>
          </div>
          <div className="col-md-4">
            <p className="count-num">{user}</p>
            <p className="count-title">
              <small>Registered Members</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
