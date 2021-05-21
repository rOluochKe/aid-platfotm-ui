import React from "react";
import { BounceLoader } from "react-spinners";

const oversabi = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20%",
};

const Loader = () => {
  return (
    <div style={{ width: "100%", minHeight: "100vh" }}>
      <div className="sweet-loading" style={oversabi}>
        <BounceLoader size={150} color={"#083E9E"} />
      </div>
    </div>
  );
};

export default Loader;
