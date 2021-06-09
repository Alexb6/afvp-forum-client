import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/hearder/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home-page/homepage.component';
import ContactPage from './pages/contact-page/contactpage.component';
import LoginPage from './pages/login-page/login-page.component';
import SingnUpMemberPage from './pages/sign-up-member-page/sign-up-member-page.component.jsx';
import SingnUpDonorPage from './pages/sign-up-donor-page/sign-up-donor-page.component';

import './App.scss';

function App() {
	return (
		<div className="app-afvp">
			<Header />
			<Switch >
				<Route exact path='/' component={HomePage} />
				<Route path='/contact' component={ContactPage} />
				<Route path='/login' component={LoginPage} />
				<Route path='/sign-up-member' component={SingnUpMemberPage} />
				<Route path='/sign-up-donor' component={SingnUpDonorPage} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
