import React from "react";

import "./ButtonedLink.css";

const ButtonedLink = ({
  caption = "",
  href = "",
  rel = "",
  target = "",
  className = "",
}) => {
  return (
    <a
      href={href}
      rel={rel !== "" ? rel : undefined}
      target={target !== "" ? target : undefined}
      className={`buttoned-link ${className} `}
    >
      {caption}
    </a>
  );
};

export default ButtonedLink;
