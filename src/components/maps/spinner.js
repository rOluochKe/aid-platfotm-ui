import React from "react";
import { BarLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="row mt-5">
      <div className="col-md-4"></div>
      <div className="col-sm-12 col-md-4">
        <div className="sweet-loading">
          <BarLoader size={50} color={"#000000"} />
          <p>Loading map please wait...</p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
