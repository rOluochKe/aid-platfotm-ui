import React, { useState } from "react";
import "../../../styles/signin.css";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { login } from "../../../store/actions/userAction";
import processing from "../../../images/loader.gif";
import Footer from "../../layouts/footer";

const Signin = (props) => {
  const { login, notification } = props;

  //setup our states using hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btnValue] = useState("Log In");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!email && !password) {
      setError("*All fields are required");
      return false;
    }

    if (!email) {
      setError("*Email is required");
      return false;
    }

    if (!password) {
      setError("*Password is required");
      return false;
    }

    // check if the email is valid
    if (/\S+@\S+\.\S+/.test(email) === false) {
      setError("*Enter a valid email address");
      return false;
    }

    // if all data is provided
    if (email && password) {
      setError("");

      // prepare the data
      const user = {
        email,
        password,
      };

      // send details to be processed
      login(user);
    }
  };

  return (
    <div>
      <Navbar ownProps={props} />
      <div className="container-fluid signin-banner">
        <div className="row pl-3">
          <div className="offset-md-3 col-md-6">
            <ToastContainer />
            <div className="card bg-light mt-5 mb-5">
              <form className="card-body">
                <h1 className="auth-heading">Sign In</h1>
                <p className="text-left text-danger">{error}</p>
                <div className="row input-group">
                  <div className="col-12 mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      aria-label="email"
                    />
                  </div>
                </div>
                <div className="row input-group">
                  <div className="col-12 mb-3">
                    <label>Password</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      aria-label="password"
                    />
                  </div>
                </div>
                <div className="row w-50 mb-3">
                  <div className="col-12">
                    {notification ? (
                      <img
                        src={processing}
                        style={{ height: "70px" }}
                        alt="processing-loader"
                      />
                    ) : (
                      <button
                        type="button"
                        className="form-control btn btn-primary"
                        onClick={handleSubmit}
                      >
                        {btnValue}
                      </button>
                    )}
                  </div>
                </div>
                <div className="row input-group pl-3">
                  <p>
                    Don't have an account?{" "}
                    <Link to="/sign-up" className="">
                      Sign Up
                    </Link>
                  </p>
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
    notification: state.user.notification,
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    login: (user) => dispatch(login(user, ownProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
