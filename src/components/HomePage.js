import React from "react";
import "../styles/HomePage.css";
import DocumentTitle from "react-document-title";
import { Link } from 'react-router-dom';



export default class HomePage extends React.Component {
	handleClick = () => {
		sessionStorage.clear();
		this.props.history.push('/login');
	}

	render() {
		return (
		<DocumentTitle title="Home Page">
			<div className="homePage">
				<h1>
					<mark> make sure you don't leave class confused </mark>
				</h1>
                <div>
                    <div>
                    </div>
      </div>
				<button className="button" onClick={this.handleClick}>Log in</button>
			</div>
            
		</DocumentTitle>
	);
	}
}
