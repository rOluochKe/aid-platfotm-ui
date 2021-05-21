import React, { useEffect, useState } from "react";
import Navbar from "../../layouts/navbar";
import { isLoggedIn } from "../../../services/utilities";
import { Redirect } from "react-router-dom";
import "../../../styles/myActivities.css";
import MyRequests from "./myRequests";
import MyVolunteering from "./myVolunteering";
import { getMyVolunteerings } from "../../../store/actions/volunteerAction";
import {
  getMyRequests,
  markAsFulfilled,
  republishRequest,
  deleteRequest,
} from "../../../store/actions/requestAction";
import { connect } from "react-redux";
import Loader from "./loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../layouts/footer";

const MyActivities = (props) => {
  const {
    getMyRequests,
    my_requests,
    getMyVolunteerings,
    my_volunteerings,
    loading,
    markAsFulfilled,
    deleteRequest,
    republishRequest,
  } = props;

  const [allRequests, setAllRequests] = useState([]);

  useEffect(() => {
    getMyRequests();
    getMyVolunteerings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setAllRequests(my_requests);
  }, [my_requests]);

  const markfulfilled = (id) => {
    markAsFulfilled(id);
    // changed the request status to fulfilled
    allRequests.map((item) => {
      if (item.id === id && item.status === 0) {
        item.status = 1;
      }
      return true;
    });
  };

  const republish = (id) => {
    republishRequest(id);
    // changed the request status to unfulfilled
    allRequests.map((item) => {
      if (item.id === id) {
        item.status = 0;
      }
      return true;
    });
  };

  const deleteReq = (id) => {
    deleteRequest(id);
    // remove the request from the request array
    setAllRequests(allRequests.filter((item) => item.id !== id));
  };

  if (!isLoggedIn()) return <Redirect to="/" />;
  if (loading) return <Loader />;

  return (
    <div>
      <Navbar ownProps={props} />
      <div className="container mt-3 mb-5 myRequests">
        <ToastContainer />
        <div className="row">
          <div className="col-12 col-md-6">
            <MyRequests
              my_requests={allRequests}
              markAsFulfilled={markfulfilled}
              republishRequest={republish}
              deleteRequest={deleteReq}
            />
          </div>
          <div className="col-12 col-md-6">
            <MyVolunteering my_volunteerings={my_volunteerings} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    my_requests: state.request.my_requests,
    my_volunteerings: state.volunteer.my_volunteerings,
    loading: state.volunteer.my_volunteerings_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMyRequests: () => dispatch(getMyRequests()),
    getMyVolunteerings: () => dispatch(getMyVolunteerings()),
    markAsFulfilled: (id) => dispatch(markAsFulfilled(id)),
    republishRequest: (id) => dispatch(republishRequest(id)),
    deleteRequest: (id) => dispatch(deleteRequest(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyActivities);
