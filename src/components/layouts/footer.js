import React from "react";
// import {Link} from 'react-router-dom'
import "../../styles/footer.css";

const Footer = () => {
  return (
    <div className="container-fluid bg-footer">
      <div className="row">
        <div className="col-12 mt-3">
          <p className="footer-copyright">
            &copy; 2021 AID Platform App. All rights reserved | Developed with{" "}
            <span className="text-danger">♥</span> by{" "}
            <a
              href="https://github.com/rOluochKe"
              target="_blank"
              rel="noopener noreferrer"
            >
              Raymond Oluoch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
