import React from "react";

export const Navigation = (props) => {
  const { showTitle } = props;

  return (
    <nav id="menu" className="navbar navbar-default navbar-fixed-top">
      <div className="container">
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
          >
            {" "}
            <span className="sr-only">Toggle navigation</span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
            <span className="icon-bar"></span>{" "}
          </button>
          <a className="navbar-brand page-scroll" href="/">
              Easy Consult
            </a>
        </div>

        <div
          className="collapse navbar-collapse"
          id="bs-example-navbar-collapse-1"
        >
          <ul className="nav navbar-nav navbar-right">
            {showTitle && (
              <li>
                <a href="#features" className="page-scroll">
                  Features
                </a>
              </li>
            )}
            {showTitle && (
              <li>
                <a href="#about" className="page-scroll">
                  About
                </a>
              </li>
            )}
            {showTitle && (
              <li>
                <a href="#services" className="page-scroll">
                  Services
                </a>
              </li>
            )}
            {showTitle && (
              <li>
                <a href="#portfolio" className="page-scroll">
                  Gallery
                </a>
              </li>
            )}
            {/* {showTitle && (
              <li>
                <a href="#testimonials" className="page-scroll">
                  Testimonials
                </a>
              </li>
            )}
            */}
            {showTitle && (
              <li>
                <a href="#team" className="page-scroll">
                  Team
                </a>
              </li>
            )}
            {showTitle && (
              <li>
                <a href="#contact" className="page-scroll">
                  Contact
                </a>
              </li>
            )}
            {showTitle && (
              <li>
                <a href="/signup" className="page-scroll">
                  Signup/Login
                </a>
              </li>
            )}
            {!showTitle && (
              <li>
                <a href="/" className="page-scroll">
                  Home
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};
