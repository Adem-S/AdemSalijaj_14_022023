import React from "react";
import { NavLink } from "react-router-dom";

import "./Header.css";

/**
 * Component for showing Header
 *
 * @component
 */
const Header = () => {
  const activeClassName = "header__nav--active";
  return (
    <div className="header">
      <h1>HRnet</h1>
      <div className="header__nav">
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Create Employee
        </NavLink>

        <NavLink
          to="/employees"
          className={({ isActive }) => (isActive ? activeClassName : undefined)}
        >
          Current employees
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
