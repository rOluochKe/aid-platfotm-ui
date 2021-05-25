import React from "react";
import { BarLoader } from "react-spinners";

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
        <BarLoader size={150} color={"#000000"} />
      </div>
    </div>
  );
};

export default Loader;
