import React from "react";

const Footer = () => {
  return (
    <div
      className="bg-secondary"
      style={{
        width: "100%",
        padding: "3px 0",
        color: "black",
        position: "absolute",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
      }}
    >
      Copyright &copy; Notez
    </div>
  );
};

export default Footer;
