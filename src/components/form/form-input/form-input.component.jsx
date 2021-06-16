import React from 'react';

import './form-input.styles.scss';

const FormInput = ({ onChange, label, ...otherProps }) => (
	<div className="form-input">
		<input className="input-input" onChange={onChange} {...otherProps} />
		{
			label &&
			(<label className={`${otherProps.value.length && 'shrink'} input-label`} >
				{label}
			</label>)
		}
	</div>
);

export default FormInput;