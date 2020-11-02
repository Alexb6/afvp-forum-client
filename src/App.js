import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/hearder/header.component';
import HomePage from './pages/homepage/homepage.component';

import './App.scss';

function App() {
	return (
		<div className="">
			<Header />
			<div className="header-sticky">Same height for the sticky header + the mobile navbar</div>
			<Switch>
				<Route exact path='/' component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
