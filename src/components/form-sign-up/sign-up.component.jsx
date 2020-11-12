import React from 'react';
import FormInput from './../form-input/form-input.component';
import CustomButton from './../button/custom-button.component';

import './sign-up.styles.scss';

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            name: '',
            firstname: '',
            email: '',
            password: '',
            passwordConfirm: ''
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.setState({ name: '', firstname: '', email: '', password: '', passwordConfirm: '' })
    }

    handleChange = e => {
        const { value, name } = e.target;
        this.setState({ [name]: value })
    }

    render() {
        return (
            <div className="sign-up col-md-6 col-sm-12 mb-3">
                <h2 className="sign-up-title">J'adhère à l'AFVP</h2>
                <p>Créer un compte pour recevoir les modalités d'adhésion à l'association</p>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <FormInput type="text" name="name" label="Nom" value={this.state.name} required onChange={this.handleChange} />
                    <FormInput type="text" name="firstname" label="Prénom" value={this.state.firstname} required onChange={this.handleChange} />
                    <FormInput type="email" name="email" label="Courriel" value={this.state.email} required onChange={this.handleChange} />
                    <FormInput type="password" name="password" label="Mot de passe" value={this.state.password} required onChange={this.handleChange} />
                    <FormInput type="password" name="passwordConfirm" label="Confirmer le mot de passe" value={this.state.passwordConfirm} required onChange={this.handleChange} />
                    <CustomButton type="submit" className="custom-button--positive--duck">Créer</CustomButton>
                </form>
            </div>
        )
    }
}

export default SignUp;