import React from "react";
import { ReactComponent as Pencil } from "./../../../assets-src/icons/pencil.svg";

import "./pencil-edit-icon.styles.scss";

const PencilEditIcon = ({ onClick }) => (
  <button className="pencil-edit-button" type="button" onClick={onClick}>
    <Pencil />
  </button>
);

export default PencilEditIcon;
