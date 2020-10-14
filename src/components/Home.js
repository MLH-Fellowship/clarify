import React from "react";
import "../styles/home.css";
import Form from "./Form";
// import "./Footer";
import CreateRoomForm from "./CreateRoomForm";

export default class Home extends React.Component {

  submitForm(e) {
    e.preventDefault()
    this.props.history.push('/thank-you'); // <--- The page you want to redirect your user to.
  }

  render() {

    return (
      <div className="home" style={{ width: '100%', height: '100%' }}>
        <div className="join">
          <h5>Enter an existing room code</h5>
          <Form />
        </div>

        <div className="create">
          <CreateRoomForm />

        </div>
      </div>

    );
  }
}
