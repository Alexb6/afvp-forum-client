import React from "react";
import ModalPopUp from "./modal-popup/modal-popup.component";

const ModalWarningPopUp = (props) => {
  return (
    <ModalPopUp
      headerClass="warning"
      title={props.title}
      open={!!props.errorMsg}
      closeModal={props.closeModal}
      footerClose
    >
      <p>{props.errorMsg}</p>
    </ModalPopUp>
  );
};

export default ModalWarningPopUp;
