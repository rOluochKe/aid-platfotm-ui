import React, { useEffect } from "react";
import Navbar from "../../layouts/navbar";
import { isLoggedIn } from "../../../services/utilities";
import { Redirect, Link } from "react-router-dom";
import "../../../styles/messages.css";
import Loader from "./loader";
import { getMessages } from "../../../store/actions/messageAction";
import { connect } from "react-redux";
import moment from "moment";
import Footer from "../../layouts/footer";

/* This component holds all the volunteers to the logged in user's request
    with a button to redirect to the chat(Message Component) between him and his volunteer
*/
const Messages = (props) => {
  const { getMessages, messages, loading } = props;

  useEffect(() => {
    getMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return <Redirect to="/" />;
  if (loading) return <Loader />;

  return (
    <div>
      <Navbar ownProps={props} />
      <div className="container mt-3 mb-5" style={{ minHeight: "100vh" }}>
        <h5 className="my-request-heading">My Messages</h5>
        {messages && messages.length !== 0 && messages !== undefined ? (
          messages.map((message, index) => {
            return (
              <div className="row mb-2" key={index}>
                <div className="col-md-2"></div>
                <div className="col-12 col-md-8">
                  {message.read_status === 0 ? (
                    <Link
                      to={`/message/${message.request_id}/${message.user_id}`}
                      className="mesg-link"
                    >
                      <div
                        className="card pl-1 volunteers-card alert alert-primary"
                        role="alert"
                      >
                        <p className="vol-name">
                          <strong>From:</strong>{" "}
                          {`${message.user.firstname} ${message.user.lastname}`}
                        </p>
                        <p className="vol-mesg">
                          <strong>Mesg:</strong> {message.content}
                        </p>
                        <p className="vol-date">
                          <strong>Date:</strong>{" "}
                          {moment(message.created_at).format("LLLL")}
                        </p>
                      </div>
                    </Link>
                  ) : (
                    <Link
                      to={`/message/${message.request_id}/${message.user_id}`}
                      className="mesg-link"
                    >
                      <div className="card pl-1 volunteers-card">
                        <p className="vol-name">
                          <strong>From:</strong>{" "}
                          {`${message.user.firstname} ${message.user.lastname}`}
                        </p>
                        <p className="vol-mesg">
                          <strong>Mesg:</strong> {message.content}
                        </p>
                        <p className="vol-date">
                          <strong>Date:</strong>{" "}
                          {moment(message.created_at).format("LLLL")}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
                <div className="col-md-2"></div>
              </div>
            );
          })
        ) : (
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-12 col-md-8">
              <div className="alert alert-primary" role="alert">
                You've got no messages yet!
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    messages: state.message.messages,
    loading: state.message.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMessages: () => dispatch(getMessages()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
