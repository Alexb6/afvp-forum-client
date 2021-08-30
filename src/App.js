import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getFreshAccessTokenAsync, allTabsLogout } from './redux/auth/auth-action-functions';
// import { userLogout } from './redux/auth/auth-action';
// import {clearCurrentUser} from './redux/user/user-action';

import Header from './components/hearder/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/home-page/homepage.component';
import ContactPage from './pages/contact-page/contactpage.component';
import LoginPage from './pages/login-page/login-page.component';
import SingnUpMemberPage from './pages/sign-up-member-page/sign-up-member-page.component.jsx';
import SingnUpDonorPage from './pages/sign-up-donor-page/sign-up-donor-page.component';
import UserPage from './pages/user-page/user-page.component';
import LoadingSpinner from './components/loading-spinner/loading-spinner.component';

import './App.scss';

class App extends React.Component {

	handleAllTabsLogout = e => {
		if (e.key === 'userLoggedOut') {
			this.props.allTabsLogout();
		}
	}

	componentDidMount() {
		this.props.getFreshAccessTokenAsync();
		window.addEventListener('storage', this.handleAllTabsLogout);
	}

	componentWillUnmount() {
		window.removeEventListener('storage', this.handleAllTabsLogout);
	}

	render() {
		const { isAuthenticated, refreshTokenLoading } = this.props
		return (
			<div className="app-afvp">
				<Header />
				<Switch >
					{refreshTokenLoading && <LoadingSpinner asOverlay />}
					<Route exact path='/' component={HomePage} />
					<Route path='/contact' component={ContactPage} />
					<Route exact path='/login' render={() => isAuthenticated ? <Redirect to='/user' /> : <LoginPage />} />
					<Route path='/user' render={() => !isAuthenticated ? <Redirect to='/login' /> : <UserPage />} />
					<Route path='/sign-up-member' component={SingnUpMemberPage} />
					<Route path='/sign-up-donor' component={SingnUpDonorPage} />
				</Switch>
				<Footer />
			</div>
		);
	}
}

const mapStateToProps = ({ auth }) => ({
	isAuthenticated: auth.isAuthenticated,
	refreshTokenLoading: auth.refreshTokenLoading
});
const mapDispatchToProps = dispatch => ({
	getFreshAccessTokenAsync: () => dispatch(getFreshAccessTokenAsync()),
	allTabsLogout: () => dispatch(allTabsLogout())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
