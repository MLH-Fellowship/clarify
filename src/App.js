import React from 'react';
import {
	Route,
	BrowserRouter as Router,
	Switch,
	Redirect,
} from 'react-router-dom';
import HomePage from './components/HomePage';
import DocumentTitle from 'react-document-title';

import './styles/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
	constuctor(props) {
		this.state = {
			questions: []
		};
	}

	render() {
		return (
			<DocumentTitle title='DoubleCheck'>
				<Router basename={process.env.PUBLIC_URL}>
					<hr></hr>
					<Switch>
						<Route path='/' exact={true} component={HomePage}></Route>
					</Switch>
				</Router>
			</DocumentTitle>

		);
	}
}

