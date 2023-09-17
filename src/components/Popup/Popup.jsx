import React from "react";
import "./Popup.css";

function Popup(props) {
  return (
    <div className={`popup ${props.isBurgerOpen ? "popup_opened" : ""}`}></div>
  );
}

export default Popup;
