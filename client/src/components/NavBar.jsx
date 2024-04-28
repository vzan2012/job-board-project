import React from "react";

import { logout } from "../lib/auth";

/**
 * NavBar Component
 *
 * @param {{ user: any; onLogout: any; }} param0
 * @param {*} param0.user
 * @param {*} param0.onLogout
 * @returns {*}
 */
const NavBar = ({ user, onLogout }) => {
  const handleLogout = () => {
    logout();
    onLogout();
  };

  const loggedIn = Boolean(user);

  /**
   * Login Menu Link
   *
   * @returns {*}
   */
  const loginMenu = () => {
    return (
      <div className="navbar-end">
        <Link className="navbar-item" to="/login">
          Login
        </Link>
      </div>
    );
  };

  /**
   * Logged In User Menu
   *
   * @param {*} user
   * @returns {*}
   */
  const loggedInUserMenu = (user) => {
    return (
      <div className="navbar-end">
        <span className="navbar-item has-text-grey">{user.email}</span>
        <Link className="navbar-item" to="/jobs/new">
          Post Job
        </Link>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className="navbar-item" onClick={handleLogout}>
          Logout
        </a>
      </div>
    );
  };

  return (
    <nav className="navbar">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Home
        </Link>
      </div>

      {loggedIn ? loggedInUserMenu(user) : loginMenu()}
    </nav>
  );
};

export default NavBar;
