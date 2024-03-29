import React from "react";
import ReactDOM from "react-dom";

import "./backdrop.styles.scss";

const Backdrop = (props) => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop")
  );
};

export default Backdrop;
