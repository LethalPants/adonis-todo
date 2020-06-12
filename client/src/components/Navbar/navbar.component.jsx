import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { createStructuredSelector } from "reselect";
import { logout } from "../../redux/user/user.action";
import { selectCurrentUser } from "../../redux/user/user.selector";

const Navbar = ({ user, logout }) => (
  <nav className="uk-navbar-container   uk-navbar-transparent uk-navbar">
    <div className="uk-navbar-left">
      <Link className="uk-navbar-item uk-logo" to="/">
        Todo Manager
      </Link>
    </div>
    <div className="uk-navbar-right">
      <ul className="uk-navbar-nav">
        {user ? (
          <>
            <li className="uk-navbar-item uk-text-uppercase">
              <span onClick={logout} className="login-button uk-text-primary">
                Logout
              </span>
            </li>
          </>
        ) : (
          <>
            <li className="uk-navbar-item">
              <Link to="/register">Register</Link>
            </li>
            <li className="uk-navbar-item">
              <Link to="/login" className="uk-text-primary">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  </nav>
);

const mapStateToProps = createStructuredSelector({
  user: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
