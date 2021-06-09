import React from 'react';
import ReactDom from 'react-dom';

import './modal-popup.styles.scss';

const ModalPopUp = ({ type, title, children, open, closeModal }) => {
   if (!open) return null
   return ReactDom.createPortal(
      <>
         <div className="modal--ovelay" onClick={closeModal} ></div>
         <div className={`modal--container ${open && 'modal-final-position'}`}>
            <div className={`${type === 'error' && 'error--header'} ${type === 'valid' && 'valid--header'} modal--header`}>
               <div className="header--row">
                  <p>{title}</p>
                  <span className="x--button" onClick={closeModal}>x</span>
               </div>
            </div>
            <div className="modal--body">
               <p>{children}</p>
            </div>
            <div className="modal--footer">
               <button className="close--button" onClick={closeModal} >Fermer</button>
            </div>
         </div>
      </>,
      document.getElementById('modal')
   )
};

export default ModalPopUp;