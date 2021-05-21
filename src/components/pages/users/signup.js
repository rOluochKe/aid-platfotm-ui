import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../layouts/navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import { signup } from "../../../store/actions/userAction";
import processing from "../../../images/loader.gif";
import Footer from "../../layouts/footer";

const Signup = (props) => {
  const { signup, notification } = props;

  //setup our states using hooks
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [image, setImage] = useState("");
  const [btnValue] = useState("Sign Up");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // check if all fields are filled
    if (!firstname && !lastname && !image && !email && !password) {
      setError("*All fields are required");
      return false;
    }
    if (!firstname) {
      setError("*Firstname is required");
      return false;
    }
    if (!lastname) {
      setError("*Lastname is required");
      return false;
    }
    if (!image) {
      setError("*Image file is required");
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

    // check password length
    if (password.length < 6) {
      setError("*Password must be maximum of 6 characters");
      return false;
    }

    // if all data is provided
    if (email && password && firstname && lastname && image) {
      setError("");

      // prepare the data
      let user = new FormData();
      user.append("firstname", firstname);
      user.append("lastname", lastname);
      user.append("image", image);
      user.append("email", email);
      user.append("password", password);

      // send details to be processed
      signup(user);
    }
  };
  return (
    <div>
      <Navbar ownProps={props} />
      <div className="container-fluid signup-banner">
        <div className="row pl-3">
          <div className="col-md-3"></div>
          <div className="col-md-6">
            <ToastContainer />
            <form className="card mt-5 pl-3">
              <h1 className="auth-heading">Sign Up</h1>
              <p className="text-left text-danger">{error}</p>
              <div className="row input-group">
                <div className="col-12 col-md-6 mb-3">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    aria-label="firstname"
                  />
                </div>
                <div className="col-12 col-md-6 mb-3">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    aria-label="lastname"
                  />
                </div>
              </div>
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
                  <label>Government Approved ID</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={(e) => setImage(e.target.files[0])}
                    accept="image/png,image/jpeg,application/pdf"
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
              <div className="row btn-group pr-4">
                <div className="col-12 mb-3">
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
              <div className="row input-group pl-3 mb-3">
                <p>
                  Already have an account?{" "}
                  <Link to="/sign-in" className="">
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
          <div className="col-md-3"></div>
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
    signup: (user) => dispatch(signup(user, ownProps)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
