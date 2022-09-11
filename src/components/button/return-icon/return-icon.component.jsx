import React from "react";
import { ReactComponent as ReturnButton } from "./../../../assets-src/icons/return-arrow.svg";

import "./return-icon.styles.scss";

const ReturnIcon = ({ onClick }) => (
  <button className="return-button" type="button" onClick={onClick}>
    <ReturnButton />
  </button>
);

export default ReturnIcon;
