import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/hearder/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home-page/homepage.component';
import ContactPage from './pages/contact-page/contactpage.component';
import SignInSignUpPage from './pages/sign-in-sign-up-page/sign-in-sign-up-page.component';

import './App.scss';

function App() {
	return (
		<div className="app-afvp">
			<Header />
			<Switch >
				<Route exact path='/' component={HomePage} />
				<Route exact path='/contact' component={ContactPage} />
				<Route exact path='/signinsignup' component={SignInSignUpPage} />
				<Route exact path='/signinsignupdonation' component={SignInSignUpPage} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
