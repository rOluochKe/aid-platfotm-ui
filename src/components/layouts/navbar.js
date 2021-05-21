import React from "react";
import "../../styles/navbar.css";
import { isLoggedIn } from "../../services/utilities";
import SignedInNav from "./signedInNav";
import SignedOutNav from "./signedOutNav";

const Navbar = (props) => {
  const { ownProps } = props;

  const nav = isLoggedIn() ? (
    <SignedInNav ownProps={ownProps} />
  ) : (
    <SignedOutNav />
  );

  return <div>{nav}</div>;
};

export default Navbar;
