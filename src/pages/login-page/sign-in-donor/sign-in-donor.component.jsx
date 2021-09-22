import React from 'react';
import { connect } from 'react-redux';

import FormInput from '../../../components/form/form-input/form-input.component';
import FormErrorMessage from '../../../components/form/form-error-message/form-error-message.component';
import CustomButton from '../../../components/button/custom-button/custom-button.component';
import { checkEmail, checkPassword, formIsValid } from '../../../utils/formContollers';
import ModalErrorPopUp from './../../../components/modal/modal-error-popup.component';
import { scrollToTop } from '../../../utils/scrollToTop';
import LoadingSpinner from '../../../components/loading-spinner/loading-spinner.component';
import { userLoginAsync } from '../../../redux/auth/auth-action-functions';

import './sign-in-donor.styles.scss';

class SignInDonor extends React.Component {
	constructor(props) {
		super(props);

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
			const { userLoginAsync } = this.props;
			try {
				this.setState({ isLoading: true });
				await userLoginAsync(['donors', email, password]);
				if (this.props.loginError) throw new Error(this.props.loginError);

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
		this.setState({ formErrors, [name]: value });
	}

	errorHandler = () => this.setState({ error: '' });

	// Fix Warning: Can't perform a React state update on an unmounted component
	componentWillUnmount() {
		this.setState = (state, callback) => { return };
	};


	render() {
		const { formErrors, isLoading, error } = this.state;
		return (
			<div className="sign-in col-md-6 col-sm-12 mb-3">
				<ModalErrorPopUp title="Erreur de connexion" errorMsg={error} closeModal={this.errorHandler} />
				{isLoading && <LoadingSpinner asOverlay />}
				<h2 className="sign-in-title">Je suis un donateur</h2>
				<p>Se connecter avec mon courriel et mot de passe</p>
				<p className="sign-in-create-account">Je ne suis pas encore donateur, je <a href="/sign-up-donor">crée un compte</a> pour soutenir l'association.</p>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<FormInput type="email" name="email" label="Courriel*" value={this.state.email} required onChange={this.handleChange} />
					{formErrors.email.length > 0 && (<FormErrorMessage >{formErrors.email}</FormErrorMessage>)}
					<FormInput type="password" name="password" label="Mot de passe*" value={this.state.password} required onChange={this.handleChange} />
					{formErrors.password.length > 0 && (<FormErrorMessage >{formErrors.password}</FormErrorMessage>)}
					<CustomButton type="submit" className="custom-button--positive--duck">Se connecter</CustomButton>
				</form>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({
	loginError: auth.loginError
});
const mapDispatchToProps = dispatch => ({
	userLoginAsync: (userData) => dispatch(userLoginAsync(userData))
})

export default connect(mapStateToProps, mapDispatchToProps)(SignInDonor);