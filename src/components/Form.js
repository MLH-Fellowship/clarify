import React from "react";
import "../styles/home.css"
import { db, auth } from "../services/firebase"
import { message } from 'antd';

import { withRouter } from 'react-router-dom'; // <--- import `withRouter`. We will use this in the bottom of our file.

// Anonymous Authentication
auth.onAuthStateChanged(function (user) {
  if (user) {
    var uid = user.uid;
    console.log(user.uid);
    // ...
  } else {
    // User is signed out.
    // ...
  }
  // ...
});

class Form extends React.Component {
  // TODO: Change this to functional component not class component, get rid of state, just use Antdesign Input (no need to use form)

  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  // TODO: Only allow redirect if collection exists
  handleSubmit(event) {
    var code = this.state.value;
    auth.signInAnonymously();
    /*
    const Ref = db.collection("rooms").doc("BBBBB");
    const doc = Ref.get();
    if (!doc.exists) {
      console.log('No such document!');
    } else {
        return this.props.history.push(`/works`);
    }
    alert(doc); */
    const success = () => {
      message.success({
        content: 'Entered room'
      });
    };
    success();

    return this.props.history.push(`${code}`);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" style={{backgroundColor: "#00134d", color: "#ffffff"}}/>
      </form>

      /*
          <div className="home">
              <div className="join">
                  <h2> Join Room (4 #'s) </h2>
                  <div className='form-group'>
                      <input
                        type='text'
                        name='user' />
                  </div>
                  <button> Join </button>
              </div>
              
              <div className="create">
              <h2> Create Room (4 #'s) </h2>
              <div className='form-group'>
                      <input
                        type='text'
                        name='user' />
                  </div>
                  <button> Join </button>
              </div>
          </div> */
    );
  }
}

export default withRouter(Form);