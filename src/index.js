import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './components/scroll-to-top/scroll-to-top.component';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@csstools/normalize.css';

import './index.css';

import App from './App';

ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop />
		<App />
	</BrowserRouter>,
	document.getElementById('root')
);

