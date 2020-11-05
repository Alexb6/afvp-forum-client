import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/hearder/header.component';
import Footer from './components/footer/footer.component';
import HomePage from './pages/homepage/homepage.component';


import './App.scss';

function App() {
	return (
		<div className="app-afvp">
			<Header />
			<div className="header-sticky">Same height for the sticky header + the mobile navbar</div>
			<Switch>
				<Route exact path='/' component={HomePage} />
			</Switch>
			<Footer />
		</div>
	);
}

export default App;
