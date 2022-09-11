import React from "react";

import "./form-cancel-valid-buttons.styles.scss";

import CustomSmallButton from "./../../button/custom-small-button/custom-small-button.component";

const FormCancelValidButtons = ({
  closeForm,
  closeText,
  submitText,
  submitForm,
}) => (
  <div className="form--buttons-menu">
    {closeForm && (
      <CustomSmallButton
        id="cancel"
        type="button"
        className="custom-small-button--positive--gray-blue-dark"
        onClick={closeForm}
      >
        {closeText}
      </CustomSmallButton>
    )}
    {submitForm && (
      <CustomSmallButton
        id="modify"
        type="submit"
        className="custom-small-button--positive--duck-light"
        onClick={submitForm}
      >
        {submitText}
      </CustomSmallButton>
    )}
  </div>
);

export default FormCancelValidButtons;
