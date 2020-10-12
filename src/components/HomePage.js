import React from "react";
import "../styles/HomePage.css";
import DocumentTitle from "react-document-title";
import Register from "./Questions";
import Poll from "./Poll";

export default class HomePage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          questions: []
        };
      }

	handleClick = () => {
		sessionStorage.clear();
		this.props.history.push('/login');
	}

	render() {
        console.log(this.state);
		return (
			<DocumentTitle title="Home Page">
				<div className="homePage">
                <Register />
                <Poll />
				</div>
			</DocumentTitle>
		);
	}
}
