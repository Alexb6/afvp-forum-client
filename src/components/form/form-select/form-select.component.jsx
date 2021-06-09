import React from 'react';

import './form-select.styles.scss';

const FormOptionsSelect = ({ onChange, label, ...otherProps }) => (
   <div className="form-select">
      {
         label ?
            (<label className={`${otherProps.value.length ? 'shrink' : ''} input-label`} >
               {label}
            </label>)
            : null
      }
      <select className="select-input" onChange={onChange} {...otherProps}>
         <option value="" disabled>{otherProps.placeholder}</option>
         {otherProps.options.map(option => {
            return (
               <option key={option} value={option} label={option} >
                  {option}
               </option>
            )
         })}
      </select>
   </div>
)

export default FormOptionsSelect;

