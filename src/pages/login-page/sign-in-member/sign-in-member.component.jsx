import React from 'react';
import FormInput from '../../../components/form/form-input/form-input.component';
import FormErrorMessage from '../../../components/form/form-error-message/form-error-message.component';
import CustomButton from '../../../components/button/custom-button.component';
import { checkEmail, checkPassword, formIsValid } from '../../../utils/controllers/form-contollers';
import ModalErrorPopUp from './../../../components/modal/modal-error-popup.component';
import { scrollToTop } from '../../../utils/controllers/scrollToTop';
import { serverOrigin } from '../../../assets-src/data/site-origins';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.component';

import './sign-in-member.styles.scss';

class SignInMember extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: '',
			formErrors: {
				email: '',
				password: ''
			},
			isModalOpen: false,
			isLoading: false,
			error: ''
		}
	}

	handleSubmit = async e => {
		e.preventDefault();
		if (formIsValid(this.state.formErrors)) {
			const { email, password } = this.state;
			try {
				this.setState({ isLoading: true });
				const response = await fetch(`${serverOrigin}/api/v1/members/login`, {
					method: 'POST',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ email, password })
				});
				const parseResponse = await response.json();
				// console.log(parseResponse);
				if (!response.ok) {
					throw new Error(parseResponse.message);
				}
				this.setState({ isLoading: false });
				scrollToTop();
				this.setState({ email: '', password: '' });
			} catch (err) {
				scrollToTop();
				this.setState({ isLoading: false, error: err.message || 'Votre demande de connexion n\'a pas été envoyée. Veuillez essayer plus tard.' });
			}
		}
	}

	handleChange = e => {
		const { value, name } = e.target;
		const { formErrors } = this.state;
		switch (name) {
			case 'email':
				formErrors.email = checkEmail(value) && value.length ? '' : `Le courriel n'a pas encore une forme correcte !`;
				break;
			case 'password':
				formErrors.password = checkPassword(value) && value.length ? '' : 'Doit contenir au moins 8 charactères avec une majuscule, un chiffre et un charactère spécial suivant !@#$%^&*';
				break;
			default:
				break;
		}
		this.setState({ formErrors, [name]: value }/* , () => console.log(this.state) */);
	}

	errorHandler = () => this.setState({ error: '' });

	render() {
		const { formErrors, isLoading, error } = this.state;
		return (
			<div className="sign-in col-md-6 col-sm-12 mb-3">
				<ModalErrorPopUp title="Erreur de connexion" error={error} closeModal={this.errorHandler} />
				{isLoading && <LoadingSpinner asOverlay />}
				<h2 className="sign-in-title">Je suis un membre</h2>
				<p>Se connecter avec mon courriel et mot de passe.</p>
				<p className="sign-in-create-account" >Je ne suis pas encore membre, je <a href="/sign-up-member">crée un compte</a> pour adhérer à l'association.</p>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<FormInput type="email" name="email" label="Courriel" value={this.state.email} required onChange={this.handleChange} />
					{formErrors.email.length > 0 && (<FormErrorMessage >{formErrors.email}</FormErrorMessage>)}
					<FormInput type="password" name="password" label="Mot de passe" value={this.state.password} required onChange={this.handleChange} />
					{formErrors.password.length > 0 && (<FormErrorMessage >{formErrors.password}</FormErrorMessage>)}
					<CustomButton type="submit" className="custom-button--positive--duck">Se connecter</CustomButton>
				</form>
			</div>
		)
	}
}

export default SignInMember;