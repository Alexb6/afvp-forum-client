import React from "react";

import "./custom-small-button.styles.scss";

const CustomSmallButton = ({ children, className, ...otherProps }) => (
  <button className={className} {...otherProps}>
    {children}
  </button>
);

export default CustomSmallButton;
