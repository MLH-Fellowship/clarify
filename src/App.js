import React, { Component } from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from "react-router-dom";
import HomePage from './components/HomePage';
import DocumentTitle from "react-document-title";
import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
	return (
		<DocumentTitle title="DoubleCheck">
			<Router basename={process.env.PUBLIC_URL}>
				<hr></hr>
				<Switch>
					<Route path="/" exact={true} component={HomePage}></Route>
				</Switch>
			</Router>
		</DocumentTitle>

	);
}

