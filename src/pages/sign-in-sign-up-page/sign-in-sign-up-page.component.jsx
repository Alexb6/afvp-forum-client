import React from 'react';
import SignIn from '../../components/form-sign-in/sign-in.component';
import SignUp from '../../components/form-sign-up/sign-up.component';

import './sign-in-sign-up-page.styles.scss';

const SignInSignUpPage = () => (
	<div className="sing-in-page">
		<div className="sing-in-titlebar container-fluid">
			<h1 className="titlebar-title container">Espace membres</h1>
		</div>
		<div className="sing-in-section container">
			<div className="row w-100">
				<SignIn />
				<SignUp />
			</div>
		</div>
	</div>
)

export default SignInSignUpPage;