import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.component';

import './App.scss';

function App() {
	return (
		<div className="">
			<Switch>
				<Route exact path='/' component={HomePage} />
			</Switch>
		</div>
	);
}

export default App;
