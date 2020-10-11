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
        <form onSubmit={this.handleSubmit}>
          <h1>
            Sign Up to
          <Link to="/">Chatty</Link>
          </h1>
          <p>Fill in the form below to create an account.</p>
          <div>
            <input placeholder="Email" name="email" type="email" onChange={this.handleChange} value={this.state.email}></input>
          </div>
          <div>
            <input placeholder="Password" name="password" onChange={this.handleChange} value={this.state.password} type="password"></input>
          </div>
          <div>
            {this.state.error ? <p>{this.state.error}</p> : null}
            <button type="submit">Sign up</button>
          </div>
          <hr></hr>
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
				<button className="button" onClick={this.handleClick}>Log in</button>
			</div>
            
		</DocumentTitle>
	);
	}
}
