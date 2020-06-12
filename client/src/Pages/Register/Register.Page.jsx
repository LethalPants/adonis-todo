import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";

import Input from "../../components/Input/input.component";
import { registerSuccess } from "../../redux/user/user.action";

const Register = ({ register, history }) => {
  const [User, setUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [Error, setError] = useState(false);
  const [postError, setPostError] = useState(null);
  const validateEmail = (email) => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "email") setError(false);
    setUser({
      ...User,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(User.email)) {
      setError(true);
      return;
    }
    axios
      .post("http://localhost:3333/api/v1/users/register", User)
      .then((res) => {
        register(res.data.user);
        localStorage.setItem("token", res.data.token);
        history.push("/");
      })
      .catch((err) => {
        console.log(err.response.data[0].message);
        if (
          err.response.data[0] &&
          err.response.data[0].message.includes("exists")
        ) {
          setPostError("Account already exists.");
        } else {
          setPostError("Something went wrong, please try again.");
        }
      });
  };

  return (
    <div className="uk-container">
      <h1 className="uk-heading-line">
        <span>Create your account</span>
      </h1>
      <span className="uk-text-light uk-text-small uk-text-danger">
        {postError}
      </span>
      <form onSubmit={handleSubmit}>
        <div className="uk-grid-small  uk-grid uk-margin-top">
          <Input
            className="uk-width-1-2@s"
            label="Username"
            placeholder="Username"
            type="text"
            name="username"
            value={User.username}
            required
            onChange={handleChange}
          />

          <Input
            className="uk-width-1-1 uk-margin-top"
            label="Email"
            placeholder="Email"
            type="text"
            name="email"
            value={User.email}
            required
            onChange={handleChange}
            error={Error}
          />

          <Input
            className="uk-width-1-1 uk-margin-top"
            label="Password"
            placeholder="Password"
            type="password"
            name="password"
            value={User.password}
            required
            onChange={handleChange}
          />
        </div>
        <div>
          <span className="uk-text-meta">Have an account?</span>
          <Link to="/login" className="uk-link">
            Login
          </Link>
        </div>
        <button
          className="uk-margin-top uk-button uk-button-primary uk-button-large"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  register: (user) => dispatch(registerSuccess(user)),
});

export default connect(null, mapDispatchToProps)(withRouter(Register));
