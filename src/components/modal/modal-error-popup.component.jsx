import React from 'react';
import ModalPopUp from './modal-popup/modal-popup.component';

const ModalErrorPopUp = props => {
   return (
      <ModalPopUp headerClass="error" title={props.title} open={!!props.error} closeModal={props.closeModal} footerClose >
         <p>{props.error}</p>
      </ModalPopUp>
   )
}

export default ModalErrorPopUp;