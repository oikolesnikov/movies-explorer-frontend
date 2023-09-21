import React from "react";
import { NavLink } from "react-router-dom";
import "./ProfileLink.css";
import profileIcon from "../../images/profile-icon.svg";

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
