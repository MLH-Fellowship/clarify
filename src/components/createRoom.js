import React, { Component } from 'react';

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

import { db, auth } from "../services/firebase"

function generate() {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 5; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

class ContactForm extends Component {

  submitForm (e) {
    e.preventDefault()
    
    // Generate unique ID
    var code = generate();

    // Add database code
    const pollData = {
        'happy': 0,
        'okay': 10,
        'sad': 13
      };

    const questionData = {
        text: "Sample Question",
        upvotes: 5
    }
      
    // Add a new document in collection "cities" with ID 'LA'
    db.collection(code).doc('poll').set(pollData);
    db.collection(code).doc('q1').set(questionData);
    return this.props.history.push(`${code}`) // <--- The page you want to redirect your user to.
  }

  render() {
    return (
      <div>
        <form onSubmit={this.submitForm.bind(this)}>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default withRouter(ContactForm); // <--- make sure to wrap your component with `withRouter()`