import React from "react";
import { NavLink } from "react-router-dom";
import "./ProfileLink.css";

const ProfileLink = ({ className = "" }) => {
  return (
    <NavLink
      to="/profile"
      className={`profile-link ${className}`}
      activeClassName="profile-link_active"
    >
      Аккаунт

    </NavLink>
  );
};

export default ProfileLink;
