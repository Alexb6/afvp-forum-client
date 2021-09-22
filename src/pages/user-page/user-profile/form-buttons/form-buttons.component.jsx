import React from "react";

import './form-buttons.styles.scss';

import CustomSmallButton from './../../../../components/button/custom-small-button/custom-small-button.component';

const FormButtons = ({ formClose, formSubmit }) => (
   <div className="form--buttons-menu">
      <CustomSmallButton id="cancel" type="button" className="custom-small-button--positive--gray-blue-dark" onClick={formClose} >Annuler</CustomSmallButton>
      <CustomSmallButton id="modify" type="submit" className="custom-small-button--positive--duck-light" onClick={formSubmit}>Modifier</CustomSmallButton>
   </div>
);

export default FormButtons;