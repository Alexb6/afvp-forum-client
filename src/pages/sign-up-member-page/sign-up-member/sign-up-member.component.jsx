import React from 'react';

import FormInput from '../../../components/form/form-input/form-input.component';
import CustomButton from '../../../components/button/custom-button.component';
import FormTextArea from '../../../components/form/form-textarea/form-text-area.component';
import FormOptionsSelect from '../../../components/form/form-select/form-select.component';
import FormErrorMessage from '../../../components/form/form-error-message/form-error-message.component';
import { checkEmail, checkPassword, checkPasswordConfirm, formIsValid } from '../../../utils/controllers/form-contollers';
import ModalPopUp from '../../../components/modal/modal-popup/modal-popup.component';
import ModalErrorPopUp from './../../../components/modal/modal-error-popup.component';
import { scrollToTop } from '../../../utils/controllers/scrollToTop';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.component';

import './sign-up-member.styles.scss';

class SignUpMember extends React.Component {
	constructor() {
		super();

		this.state = {
			gender: '',
			family_name: '',
			first_name: '',
			email: '',
			password: '',
			pass_confirm: '',
			biography: '',
			genderOptions: ['Monsieur', 'Madame'],
			formErrors: {
				email: '',
				password: '',
				pass_confirm: ''
			},
			isModalOpen: false,
			isLoading: false,
			error: ''
		}
	}

	handleSubmit = async e => {
		e.preventDefault();
		if (formIsValid(this.state.formErrors)) {
			const { gender, family_name, first_name, email, password, pass_confirm, biography } = this.state;
			try {
				this.setState({ isLoading: true });
				const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/api/v1/members/signup`, {
					method: 'POST',
					credentials: 'include',
					mode: 'cors',
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						gender, family_name, first_name, email, password, pass_confirm, biography
					})
				});
				const parseResponse = await response.json();
				if (!response.ok) {
					throw new Error(parseResponse.message);
				}
				this.setState({ isLoading: false });
				scrollToTop();
				this.openModal();
				this.setState({ gender: '', family_name: '', first_name: '', email: '', password: '', pass_confirm: '', biography: '' });
			} catch (err) {
				scrollToTop();
				this.setState({ isLoading: false, error: err.message || 'Une erreur est survenue, votre demande n\'a pas été envoyée. Veuillez essayer plus tard.' });
			}
		}
	}

	handleChange = e => {
		const { name, value } = e.target;
		const { password, formErrors } = this.state;
		switch (name) {
			case 'email':
				formErrors.email = checkEmail(value) && value.length ? '' : `Le courriel n'a pas encore une forme correcte !`
				this.setState({ formErrors, [name]: value });
				break;
			case 'password':
				formErrors.password = checkPassword(value) && value.length ? '' : 'Doit contenir au moins 8 charactères avec une majuscule, un chiffre et un charactère spécial suivant !@#$%^&*'
				this.setState({ formErrors, [name]: value });
				break;
			case 'pass_confirm':
				formErrors.pass_confirm = checkPasswordConfirm(password, value) && value.length ? '' : 'Le mot de passe et sa confirmation ne sont pas identique !'
				this.setState({ formErrors, [name]: value });
				break;
			default:
				break;
		}
		this.setState({ [name]: value }/* , () => console.log(this.state) */);
	}

	closeModal = () => this.setState({ isModalOpen: false });
	openModal = () => this.setState({ isModalOpen: true });
	errorHandler = () => this.setState({ error: '' });

	render() {
		const { isModalOpen, formErrors, isLoading, error } = this.state;
		return (
			<div className="sign-up col-xl-7 col-lg-8 col-md-10 col-sm-10 col-12 mb-3">
				{/* <CustomButton onClick={this.openModal} className="custom-button--positive--duck">Modal</CustomButton> */}
				<ModalPopUp open={isModalOpen} closeModal={this.closeModal} headerClass='valid' title="Demande envoyée" footerClose>
					Nous vous remercions pour votre demande d'adhésion. Vous recevrez une réponse par courriel !
				</ModalPopUp>
				<ModalErrorPopUp title="Une erreur est survenue" errorMsg={error} closeModal={this.errorHandler} />
				{isLoading && <LoadingSpinner asOverlay />}
				<h2 className="sign-up-title">J'adhère à l'AFVP</h2>
				<p>Je crée un compte pour commencer mon processus d'adhésion à l'association.</p>
				<p className="sign-up-connect-account">Je suis déjà membre, <a href="/login">je me connecte</a> à mon compte.</p>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<FormOptionsSelect name="gender" label="Civilité*" value={this.state.gender} options={this.state.genderOptions} placeholder='' required onChange={this.handleChange} />
					<FormInput type="text" name="family_name" label="Nom*" value={this.state.family_name} required onChange={this.handleChange} />
					<FormInput type="text" name="first_name" label="Prénom*" value={this.state.first_name} required onChange={this.handleChange} />
					<FormInput type="email" name="email" label="Courriel*" value={this.state.email} required onChange={this.handleChange} />
					{formErrors.email.length > 0 && (<FormErrorMessage >{formErrors.email}</FormErrorMessage>)}
					<FormInput type="password" name="password" label="Mot de passe*" value={this.state.password} required onChange={this.handleChange} />
					{formErrors.password.length > 0 && (<FormErrorMessage >{formErrors.password}</FormErrorMessage>)}
					<FormInput type="password" name="pass_confirm" label="Confirmer le mot de passe*" value={this.state.pass_confirm} required onChange={this.handleChange} onBlur={this.checkPasswordConfirm} />
					{formErrors.pass_confirm.length > 0 && (<FormErrorMessage >{formErrors.pass_confirm}</FormErrorMessage>)}
					<FormTextArea type="textarea" name="biography" label="Présentez vous en quelques mots...*" value={this.state.biography} rows="3" required onChange={this.handleChange} />
					<CustomButton type="submit" className="custom-button--positive--duck">Créer</CustomButton>
				</form>
			</div>
		)
	}
}

export default SignUpMember;