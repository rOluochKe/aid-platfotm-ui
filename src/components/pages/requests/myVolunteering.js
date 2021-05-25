import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const MyVolunteering = ({ my_volunteerings }) => {
  return (
    <div>
      <h4 className="my-request-heading text-left">My Volunteering</h4>
      {my_volunteerings && my_volunteerings.length !== 0 ? (
        my_volunteerings.map((volunteer) => {
          return (
            <div className="row mb-2" key={volunteer.id}>
              <div className="col-12 mb-2">
                <div className="card my-request-card pl-2">
                  <h5 className="text-left mb-0 mt-2 req-title">
                    {volunteer.request.title}
                  </h5>
                  <p className="text-left mb-0">
                    <strong>Request by:</strong>{" "}
                    {`${volunteer.request.user.firstname} ${volunteer.request.user.lastname}`}
                  </p>
                  <p className="text-left mb-0">
                    <strong>Type:</strong> {volunteer.request.reqtype}
                  </p>
                  {volunteer.request.status === 0 ? (
                    <p className="text-left mb-0">
                      <strong>Status:</strong>
                      <span className="text-danger"> Unfulfilled</span>
                    </p>
                  ) : (
                    <p className="text-left mb-0">
                      <strong>Status:</strong>
                      <span className="text-success"> Fulfilled</span>
                    </p>
                  )}
                  <p className="text-left mb-0 text-truncate">
                    <strong>Description:</strong> <br />
                    {volunteer.request.description}
                  </p>
                  <p className="text-left mb-0">
                    <strong>Created:</strong>{" "}
                    {moment(volunteer.created_at).format("LLLL")}
                  </p>
                  <div className="d-flex mb-2">
                    <Link
                      to={`/request/${
                        volunteer.request.id
                      }/${volunteer.request.title
                        .toLowerCase()
                        .split(" ")
                        .join("-")}`}
                      className="btn btn-info btn-sm mr-1"
                    >
                      View Request
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="alert alert-primary text-left" role="alert">
          You haven't volunteered for any request yet!
        </div>
      )}
    </div>
  );
};

export default MyVolunteering;
