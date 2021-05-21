import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/navbar";
import { isLoggedIn, getUser } from "../../../services/utilities";
import { Redirect } from "react-router-dom";
import "../../../styles/message.css";
import {
  chatMessages,
  sendMessage,
  readStatus,
} from "../../../store/actions/messageAction";
import { singleRequest } from "../../../store/actions/requestAction";
import { connect } from "react-redux";
import moment from "moment";
import Loader from "./loader";
import Spinning from "../../../images/loading.gif";
import Footer from "../../layouts/footer";

const Message = (props) => {
  const {
    chatMessages,
    loading,
    chat_messages,
    match: {
      params: { request_id, user_id },
    },
    singleRequest,
    single_loading,
    request,
    sendMessage,
    readStatus,
  } = props;

  const [content, setContent] = useState("");
  const [chats, setChats] = useState(chat_messages);

  // handles form validation and message sending
  const handleSubmit = (e) => {
    e.preventDefault();
    if (content) {
      // this message will be sent to the database
      const mesg = {
        receiver_id: user_id,
        content,
        request_id,
      };
      // a copy of the message will also be shown to the user to mimick real time messaging
      const add = {
        content,
        user_id: getUser().user_id,
        created_at: Date(),
      };
      // add the new message to the chats state
      setChats((prev) => [...prev, add]);
      // send the message to the backend
      sendMessage(mesg);
      // clear state
      setContent("");
    } else {
      return false;
    }
  };

  // update our chats state once component is loaded
  useEffect(() => {
    setChats(
      chat_messages.map((message) => {
        return {
          content: message.content,
          user_id: message.user_id,
          created_at: message.created_at,
        };
      })
    );
  }, [chat_messages]);

  useEffect(() => {
    chatMessages(request_id, user_id);
    singleRequest(request_id);
    readStatus(request_id, user_id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!isLoggedIn()) return <Redirect to="/" />;
  if (loading) return <Loader />;

  return (
    <div>
      <Navbar ownProps={props} />
      <div className="container mt-5 message-container">
        <div className="row">
          <div className="col-12 col-md-4 mb-4 order-2 order-md-1">
            <div className="about-request">
              <div className="card pl-2 pr-2">
                {!single_loading ? (
                  <div className="about-body">
                    <h6 className="request-title">{request.title}</h6>
                    <h6 className="about-req-by">
                      <strong>Request by:</strong>{" "}
                      {`${request.user.firstname} ${request.user.lastname}`}
                    </h6>
                    <p className="about-req-type">
                      <strong>Type:</strong> {request.reqtype}
                    </p>
                    {request.status === 0 ? (
                      <p className="about-req-type">
                        <strong>Status:</strong>
                        <span className="text-danger"> Unfulfilled</span>
                      </p>
                    ) : (
                      <p className="about-req-type">
                        <strong>Status:</strong>
                        <span className="text-success"> Fulfilled</span>
                      </p>
                    )}
                    <p className="about-req-description">
                      <strong>Description:</strong> <br /> {request.description}
                    </p>
                    <p className="about-req-created">
                      <strong>Created at:</strong>{" "}
                      {moment(request.created_at).format("LLL")}
                    </p>
                  </div>
                ) : (
                  <img src={Spinning} alt="loading-request" />
                )}
              </div>
            </div>
          </div>
          <div className="col-12 col-md-8 mb-4 order-1 order-md-2">
            <div className="card">
              <div className="chat-head">
                <h5>AID Platform App Chat</h5>
              </div>
              <div className="chat-body">
                <div>
                  {chat_messages && chat_messages.length !== 0 ? (
                    chats.map((chat, index) => {
                      return (
                        <div key={index}>
                          {chat.user_id === getUser().user_id ? (
                            <div className="messageContainer justifyEnd">
                              <p className="sentText pr-10">
                                {moment(chat.created_at).calendar()}
                              </p>
                              <div className="messageBox backgroundBlue">
                                <p className="messageText colorWhite">
                                  {chat.content}
                                </p>
                              </div>
                            </div>
                          ) : (
                            <div className="messageContainer justifyStart">
                              <div className="messageBox backgroundLight">
                                <p className="messageText colorDark">
                                  {chat.content}
                                </p>
                              </div>
                              <p className="sentText pl-10">
                                {moment(chat.created_at).calendar()}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="alert alert-primary" role="alert">
                      Oops.....What have you done?
                    </div>
                  )}
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="chat-action">
                  <div className="text-input">
                    <input
                      type="text"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="form-control"
                      placeholder="type your messages here..."
                    />
                  </div>
                  <div className="chat-btn">
                    <button className="form-control" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </div>
              </form>
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
    chat_messages: state.message.chat_messages,
    loading: state.message.chat_loading,

    request: state.request.request,
    single_loading: state.request.single_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    chatMessages: (request_id, user_id) =>
      dispatch(chatMessages(request_id, user_id)),
    singleRequest: (request_id) => dispatch(singleRequest(request_id)),
    sendMessage: (mesg) => dispatch(sendMessage(mesg)),
    readStatus: (request_id, user_id) =>
      dispatch(readStatus(request_id, user_id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Message);
