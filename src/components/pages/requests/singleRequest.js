import React, { useEffect, Suspense, lazy, useState } from "react";
import Navbar from "../../layouts/navbar";
import "../../../styles/singleRequest.css";
import { isLoggedIn, getUser } from "../../../services/utilities";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { singleRequest } from "../../../store/actions/requestAction";
import { sendMessage } from "../../../store/actions/messageAction";
import { makeVolunteer } from "../../../store/actions/volunteerAction";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";
import Loader from "./loader";
import processing from "../../../images/loader.gif";
import Footer from "../../layouts/footer";

const SingleRequestMap = lazy(() => import("../../maps/singleRequestMap"));

//This page displays the request details
const SingleRequest = (props) => {
  const {
    singleRequest,
    request,
    loading,
    match: {
      params: { id },
    },
    sendMessage,
    makeVolunteer,
    volunteer_btn,
  } = props;

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    singleRequest(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // This method uses the find array method to dictect if the user already volunteered
  const algo = (volunteer) => {
    return volunteer.user_id === getUser().user_id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!message) {
      setError("*A message is required");
      return false;
    }

    if (message) {
      setError("");
      let mesg = {
        receiver_id: request.user_id,
        content: message,
        request_id: id,
      };

      let volunteer = {
        request_id: id,
        requester_id: request.user_id,
      };

      sendMessage(mesg);
      makeVolunteer(volunteer);
    }
  };

  if (!isLoggedIn()) return <Redirect to="/" />;
  if (loading) return <Loader />;
  return (
    <div style={{ minHeight: "100vh" }}>
      <Navbar ownProps={props} />
      <Suspense fallback={<div>Loading...</div>}>
        {request && <SingleRequestMap request={request} />}
      </Suspense>
      <div className="container single-banner mt-5">
        <div className="row">
          <div className="col-12 col-md-7 mb-3">
            <div className="card">
              <form className="submit-help-form pl-2 pr-2">
                <ToastContainer />
                <h5 className="text-left">Do You Want to Volunteer?</h5>
                <div className="row input-group">
                  <p className="text-left text-danger pl-3">{error}</p>
                  <div className="col-12 mb-3">
                    <label>
                      Message<span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type message to the requester here..."
                      aria-label="message"
                    />
                  </div>
                </div>
                {request.volunteers.find(algo) ? (
                  <p className="text-danger">
                    You have already volunteered for this request.
                  </p>
                ) : getUser().user_id === request.user_id ? (
                  <p className="text-danger">
                    You can't volunteer on your own request.
                  </p>
                ) : (
                  <div className="row">
                    <div className="btn-group col-12 col-md-4 mb-3">
                      {volunteer_btn ? (
                        <img
                          src={processing}
                          style={{ height: "70px" }}
                          alt="processing-loader"
                        />
                      ) : (
                        <button
                          type="button"
                          className="form-control btn btn-success"
                          onClick={handleSubmit}
                        >
                          SEND
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="col-12 col-md-5 mb-5">
            <div className="about-volunteers">
              <div className="card">
                <h5 className="pl-2">Volunteers For This Request</h5>
                {request.volunteers.length !== 0 ? (
                  <div className="table-responsive pl-2">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Date & Time</th>
                        </tr>
                      </thead>
                      <tbody className="pl-2">
                        {request.volunteers &&
                          request.volunteers.map((volunteer, index) => {
                            return (
                              <tr key={index}>
                                <td className="text-left">{`${volunteer.user.firstname} ${volunteer.user.lastname}`}</td>
                                <td>
                                  {moment(volunteer.created_at).format("LLLL")}
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="alert alert-primary" role="alert">
                    No volunteer(s) yet!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    request: state.request.request,
    loading: state.request.single_loading,
    volunteer_btn: state.volunteer.volunteer_btn,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    singleRequest: (id) => dispatch(singleRequest(id)),
    sendMessage: (mesg) => dispatch(sendMessage(mesg)),
    makeVolunteer: (volunteer) => dispatch(makeVolunteer(volunteer, ownProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleRequest);
