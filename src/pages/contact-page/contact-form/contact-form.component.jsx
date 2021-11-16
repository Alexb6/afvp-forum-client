import React from 'react';
import FormInput from '../../../components/form/form-input/form-input.component';
import FormTextArea from '../../../components/form/form-textarea/form-text-area.component';
import CustomButton from '../../../components/button/custom-button/custom-button.component';
import FormErrorMessage from '../../../components/form/form-error-message/form-error-message.component';
import { checkEmail, formIsValid } from '../../../utils/formContollers';
import ModalPopUp from '../../../components/modal/modal-popup/modal-popup.component';
import ModalErrorPopUp from '../../../components/modal/modal-error-popup.component';
import { scrollToTop } from '../../../utils/scrollToTop';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.component';
import API_URL from '../../../assets-src/data/API-Url';

import './contact-form.styles.scss';

class ContactForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			email: '',
			message: '',
			formErrors: {
				email: '',
			},
			isModalOpen: false,
			isLoading: false,
			error: '',
		}
	}

	handleSubmit = async e => {
		e.preventDefault();
		if (formIsValid(this.state.formErrors)) {
			const { name, email, message } = this.state;
			try {
				this.setState({ isLoading: true });
				const response = await fetch(`${API_URL}/afvp/contact-us`, {
					method: 'POST',
					credentials: 'include',
					mode: 'cors',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({ name, email, message })
				});
				const parseResponse = await response.json();
				if (!response.ok) {
					throw new Error(parseResponse.message)
				}
				this.setState({ isLoading: false, isModalOpen: true });
				scrollToTop();
				this.setState({ name: '', email: '', message: '' })
			} catch (err) {
				scrollToTop();
				this.setState({ error: err.message, isLoading: false });
			}
		}
		this.setState({ isLoading: false });
	}

	handleChange = e => {
		const { name, value } = e.target;
		const { formErrors } = this.state;
		if (name === 'email') {
			formErrors.email = checkEmail(value) && value.length ? '' : `Le courriel n'a pas encore une forme correcte !`
			this.setState({ formErrors, [name]: value });
		}
		this.setState({ [name]: value });
	}

	closeModal = () => this.setState({ isModalOpen: false });
	openModal = () => this.setState({ isModalOpen: true });
	errorHandler = () => this.setState({ error: '' });

	render() {
		const { name, email, formErrors, message, isLoading, error, isModalOpen } = this.state;
		return (
			<div className="contact-form col-md-6 col-sm-12 mb-3">
				<ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Message envoyé" footerClose>
					Votre message a été envoyé avec succès !
				</ModalPopUp>
				<ModalErrorPopUp title="Erreur de connexion" errorMsg={error} closeModal={this.errorHandler} />
				{isLoading && <LoadingSpinner asOverlay />}
				<h2 className="form-title">Envoyez un message</h2>
				<form onSubmit={this.handleSubmit} autoComplete="off" >
					<FormInput type="text" name="name" label="Nom & Prénom *" value={name} required onChange={this.handleChange} />
					<FormInput type="email" name="email" label="Courriel *" value={email} required onChange={this.handleChange} />
					{formErrors.email.length > 0 && email.length > 3 && (<FormErrorMessage >{formErrors.email}</FormErrorMessage>)}
					<FormTextArea type="textarea" name="message" label="Votre message... *" value={message} rows="3" required onChange={this.handleChange} />
					<CustomButton className="custom-button--positive--duck mb-3" type="submit">envoyer</CustomButton>
				</form>
			</div>
		)
	}
}

export default ContactForm;