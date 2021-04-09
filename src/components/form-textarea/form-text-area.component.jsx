import React from 'react';

import './form-text-area.styles.scss';

const FormTextArea = ({ onChange, label, ...otherProps }) => (
	<div className="form-textarea">
		<textarea className="textarea-textarea" onChange={onChange} {...otherProps} />
		{
			label ?
				(<label className={`${otherProps.value.length ? "shrink" : ""} textarea-label`} >{label}</label>)
				: null
		}
	</div>
);

export default FormTextArea;