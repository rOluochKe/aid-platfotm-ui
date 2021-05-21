import React, { useEffect, Suspense, lazy } from "react";
import "../../styles/home.css";
import { Link } from "react-router-dom";
import account from "../../images/account.png";
import request from "../../images/request.png";
import volunteer from "../../images/volunteer.png";
import Navbar from "../layouts/navbar";
import { connect } from "react-redux";
import { requestCounter } from "../../store/actions/requestAction";
import { userCounter } from "../../store/actions/userAction";
import Loader from "../pages/requests/loader";
import Footer from "../layouts/footer";

const Counter = lazy(() => import("../layouts/counter"));

const Home = (props) => {
  const {
    requestCounter,
    userCounter,
    request_counter,
    user_counter,
    loading,
  } = props;

  useEffect(() => {
    requestCounter();
    userCounter();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) return <Loader />;
  return (
    <div>
      <Navbar ownProps={props} />
      <div className="first-section">
        <div className="inner-content container">
          <div className="row">
            <div className="col-12 col-sm-8 intro-txt">
              <h1>
                A Better Way <br />
                To Be a Brothers Keeper
              </h1>
              <div className="">
                <Link to="/sign-up" className="myBtn">
                  Create a Free Account
                </Link>
              </div>
            </div>
            <div className="col-sm-4"></div>
          </div>
        </div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {user_counter && (
          <Counter request={request_counter} user={user_counter} />
        )}
      </Suspense>
      <div className="second-section container-fluid pt-4 pb-4 mb-5">
        <h1 className="second-section-heading">
          Let us come together to help in the community
        </h1>
        <p className="second-section-text">
          Technology can be used in many ways, but it's best used to help
          people.
          <br /> This can be at the global level, or it can be used to make a
          difference right outside your door!
        </p>
      </div>
      <div className="third-section container mt-5 mb-5">
        <h1 className="second-section-heading">How It Works</h1>
        <div className="row">
          <div className="col-12 col-md-4 mb-2">
            <div className="card">
              <img src={account} alt="account-pix" className="img-fluid" />
              <div className="card-body">
                <h5 className="card-heading">
                  Sign Up<br /> for account
                </h5>
                <p className="card-text">
                  Create an account with your first name, last name, email
                  address and upload a copy of any government approved ID.
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
                  Use the geolocalized map with markers on it indicating people
                  in need of help in your community.
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
                  Submit a request for help with a brief description, type of
                  request and your location.
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
