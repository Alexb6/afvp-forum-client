import React from 'react';

import './form-text-area.styles.scss';

const FormTextArea = ({ onChange, label, ...otherProps }) => {
	const handleKeyDown = (e) => {
		e.target.style.height = 'inherit';
		e.target.style.height = `${e.target.scrollHeight}px`;
	}
	return (
		<div className="form-textarea">
			<textarea className="textarea-textarea" onChange={onChange} {...otherProps} onKeyDown={handleKeyDown}></textarea>
			{
				label &&
				(<label className={`${otherProps.value.length ? "shrink" : ""} textarea-label`} >{label}</label>)
			}
		</div>
	)
};

export default FormTextArea;