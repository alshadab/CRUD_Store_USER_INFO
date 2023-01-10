import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <p>
        All Rights Reserved By Al Shadab Arnab | {new Date().getFullYear()}{" "}
      </p>
    </div>
  );
};

export default Footer;
