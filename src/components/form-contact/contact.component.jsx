import React from 'react';
import FormInput from './../form-input/form-input.component';
import FormTextArea from './../../components/form-textarea/form-text-area.component';
import CustomButton from './../button/custom-button.component';

import './contact.styles.scss';

class ContactForm extends React.Component {
	constructor() {
		super();

		this.state = {
			name: '',
			email: '',
			message: ''
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ name: '', email: '', message: '' })
	}

	handleChange = e => {
		const { name, value } = e.target;
		this.setState({ [name]: value });
	}

	render() {
		return (
			<div className="contact-form col-md-6 col-sm-12 mb-3">
				<h2 className="form-title">Envoyez un message</h2>
				<form onSubmit={this.handleSubmit} autoComplete="off" >
					<FormInput type="text" name="name" label="Nom & Prénom" value={this.state.name} required onChange={this.handleChange} />
					<FormInput type="email" name="email" label="Courriel" value={this.state.email} required onChange={this.handleChange} />
					<FormTextArea type="textarea" name="message" label="Votre message..." value={this.state.message} rows="3" required onChange={this.handleChange} />
					<CustomButton className="custom-button--positive--duck mb-3" type="submit">envoyer</CustomButton>
				</form>
			</div>
		)
	}
}

export default ContactForm;