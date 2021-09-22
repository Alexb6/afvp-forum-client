import React from 'react';

import './form-text-area.styles.scss';

const FormTextArea = ({ onChange, label, ...otherProps }) => (
	<div className="form-textarea">
		<textarea className="textarea-textarea" onChange={onChange} {...otherProps}></textarea>
		{
			label &&
			(<label className={`${otherProps.value.length ? "shrink" : ""} textarea-label`} >{label}</label>)
		}
	</div>
);

export default FormTextArea;