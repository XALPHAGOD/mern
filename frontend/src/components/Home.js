import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const userLogin_RegisterReducer = useSelector(
    (state) => state.userLogin_RegisterReducer
  );
  const userInfo = userLogin_RegisterReducer.userInfo;
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{
        height: "90vh",
        backgroundImage: `url("./images/home.png")`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        backgroundPosition: "center",
      }}
    >
      <div style={{ color: "#003fff", textShadow: "2px 2px 5px #ffbe00" }}>
        <h1
          style={{
            fontSize: "2.4rem",
            textAlign: "center",
          }}
        >
          Welcome to Notez
        </h1>
        <h5 className="mt-2 mb-3 text-center">
          The safest place for your notes
        </h5>
      </div>
      <div style={{ width: "22%" }}>
        {userInfo ? (
          <div className="row">
            <div className="col-12 my-2 d-flex justify-content-center">
              <Link to="/notes">
                <button type="button" className="btn btn-danger btn-lg">
                  My Notez
                </button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="row">
            <div className="col-12 col-lg-6 my-2 d-flex justify-content-center">
              <Link to="/login">
                <button type="button" className="btn btn-danger btn-lg">
                  Sign In
                </button>
              </Link>
            </div>
            <div className="col-12 col-lg-6 my-2 d-flex justify-content-center">
              <Link to="/register">
                <button type="button" className="btn btn-warning btn-lg">
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
