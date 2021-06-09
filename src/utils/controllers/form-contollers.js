exports.checkEmail = (email) => {
	const emailRegex = new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/);
	return emailRegex.test(email);
}

exports.checkPassword = (password) => {
	const passwordRegex = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
	return passwordRegex.test(password);
}

exports.checkPasswordConfirm = (password, pass_confirm) => {
	return (password === pass_confirm) ? true : false
}

exports.formIsValid = formErrors => {
	let isValid = true;
	// Check if there are error messages in the state
	Object.values(formErrors).forEach(val => {
		val.length && (isValid = false);
	});
	return isValid;
};