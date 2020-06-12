import React from "react";
import { Link } from "react-router-dom";

import "./Herosection.styles.css";
const Hero = () => (
  <div className="uk-section uk-section-primary">
    <h1 className="uk-heading-line uk-text-center">
      <span>Todo Manager</span>
    </h1>
    <Link
      to="/register"
      className="uk-button uk-button-default uk-align-centre"
    >
      Register Now
    </Link>
  </div>
);

export default Hero;
