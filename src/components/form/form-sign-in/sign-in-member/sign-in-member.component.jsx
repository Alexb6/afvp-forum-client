import React from 'react';
import FormInput from '../../form-input/form-input.component';
import CustomButton from '../../../button/custom-button.component';

import './sign-in-member.styles.scss';

class SignInMember extends React.Component {
	constructor() {
		super();

		this.state = {
			email: '',
			password: ''
		}
	}

	handleSubmit = e => {
		e.preventDefault();
		this.setState({ email: '', password: '' })
	}

	handleChange = e => {
		const { value, name } = e.target;
		this.setState({ [name]: value })
	}

	render() {
		return (
			<div className="sign-in col-md-6 col-sm-12 mb-3">
				<h2 className="sign-in-title">Je suis un membre</h2>
				<p>Se connecter avec mon courriel et mot de passe.</p>
				<p className="sign-in-create-account" >Je ne suis pas encore membre, je <a href="/sign-up-member">crée un compte</a> pour adhérer à l'association.</p>
				<form onSubmit={this.handleSubmit} autoComplete="off">
					<FormInput type="email" name="email" label="Courriel" value={this.state.email} required onChange={this.handleChange} />
					<FormInput type="password" name="password" label="Mot de passe" value={this.state.password} required onChange={this.handleChange} />
					<CustomButton type="submit" className="custom-button--positive--duck">Se connecter</CustomButton>
				</form>
			</div>
		)
	}
}

export default SignInMember;