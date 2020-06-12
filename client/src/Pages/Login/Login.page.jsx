import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { loginSuccess } from "../../redux/user/user.action";
import Input from "../../components/Input/input.component";

const Login = ({ login, history }) => {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });
  const [PostError, SetPostError] = useState(null);
  const handleChange = (event) => {
    SetPostError(null);
    const { name, value } = event.target;
    setUser({
      ...User,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3333/api/v1/users/login", User)
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        login(res.data);
        history.push("/");
      })
      .catch((err) => {
        SetPostError("Invalid Email or Password");
      });
  };

  return (
    <div className="uk-container">
      <h1 className="uk-heading-line">
        <span>Log in</span>
      </h1>
      {PostError ? (
        <span className="uk-text-light uk-text-small uk-text-danger">
          {PostError}
        </span>
      ) : null}
      <form onSubmit={handleSubmit}>
        <div className="uk-grid-small  uk-grid uk-margin-top">
          <Input
            className="uk-width-1-1"
            label="Email"
            placeholder="Email"
            type="text"
            name="email"
            required
            onChange={handleChange}
          />

          <Input
            className="uk-width-1-1 uk-margin-top"
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            required
            onChange={handleChange}
          />
        </div>
        <div className="uk-margin-top">
          <span className="uk-text-meta">Don't have an account?</span>
          <Link to="/register" className="uk-link uk-margin-small-left">
            Create one now.
          </Link>
        </div>
        <button
          className="uk-margin-top uk-button uk-button-primary uk-button-large"
          type="submit"
        >
          Login
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (user) => dispatch(loginSuccess(user)),
  };
};

export default connect(null, mapDispatchToProps)(withRouter(Login));
