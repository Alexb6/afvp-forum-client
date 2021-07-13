import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './components/hearder/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home-page/homepage.component';
import ContactPage from './pages/contact-page/contactpage.component';
import LoginPage from './pages/login-page/login-page.component';
import SingnUpMemberPage from './pages/sign-up-member-page/sign-up-member-page.component.jsx';
import SingnUpDonorPage from './pages/sign-up-donor-page/sign-up-donor-page.component';
import UserPage from './pages/user-page/user-page.component';

import './App.scss';

class App extends React.Component {
	render() {
		const { currentUser } = this.props
		return (
			<div className="app-afvp">
				<Header />
				<Switch >
					<Route exact path='/' component={HomePage} />
					<Route path='/contact' component={ContactPage} />
					<Route exact path='/login' render={() => currentUser ? <Redirect to='/user' /> : <LoginPage />} />
					<Route path='/user' render={() => !currentUser ? <Redirect to='/login' /> : <UserPage />} />
					<Route path='/sign-up-member' component={SingnUpMemberPage} />
					<Route path='/sign-up-donor' component={SingnUpDonorPage} />
				</Switch>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser
})

export default connect(mapStateToProps)(App);
