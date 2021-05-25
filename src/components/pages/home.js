import React, { useEffect, Suspense, lazy } from "react";
import "../../styles/home.css";
import account from "../../images/signup-for-account-img.jpg";
import request from "../../images/request-for-help-img.jpg";
import volunteer from "../../images/volunteer-to-help-img.jpg";
import Navbar from "../layouts/navbar";
import { connect } from "react-redux";
import { requestCounter } from "../../store/actions/requestAction";
import { userCounter } from "../../store/actions/userAction";
import Footer from "../layouts/footer";

const Counter = lazy(() => import("../layouts/counter"));

const Home = (props) => {
  const {
    requestCounter,
    userCounter,
    request_counter,
    user_counter,
  } = props;

  useEffect(() => {
    requestCounter();
    userCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Navbar ownProps={props} />
      <div className="first-section">
        <div className="container">
          <div className="row">
            <div className="col-12 intro-txt">
              <h1>
                A better way to offer help in your community.
              </h1>
            </div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {user_counter && (
          <Counter request={request_counter} user={user_counter} />
        )}
      </Suspense>
      <div className="third-section container mt-5 mb-5">
        <h1 className="second-section-heading mt-3 mb-4">How The App Works</h1>
        <div className="row">
          <div className="col-12 col-md-4 mb-2">
            <div className="card">
              <img src={account} alt="account-pix" className="img-fluid" />
              <div className="card-body">
                <h5 className="card-heading">
                  Sign Up<br /> an for account
                </h5>
                <p className="card-text">
                  Create an account with with us and enjoy the benefits of belonging to benefitting community.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="card">
              <img src={volunteer} alt="volunteer-pix" className="img-fluid" />
              <div className="card-body">
                <h5 className="card-heading">
                  Volunteer to<br /> help those in need
                </h5>
                <p className="card-text">
                  We use google maps and markers to show people
                  in need of our help in the community.
                </p>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mb-2">
            <div className="card">
              <img src={request} alt="request-pix" className="img-fluid" />
              <div className="card-body">
                <h5 className="card-heading">
                  Request for help<br /> from the community
                </h5>
                <p className="card-text">
                  Submit a request for help and people from your community will come together to your rescue.
                </p>
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
    request_counter: state.request.request_counter,
    user_counter: state.user.user_counter,
    loading: state.user.user_loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    requestCounter: () => dispatch(requestCounter()),
    userCounter: () => dispatch(userCounter()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
