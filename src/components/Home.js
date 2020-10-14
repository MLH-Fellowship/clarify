import React from "react";
import "../styles/home.css";
import Form from "./form";
// import "./Footer";
import CreateRoomForm from "./CreateRoomForm";

export default class Home extends React.Component {

  submitForm(e) {
    e.preventDefault()
    this.props.history.push('/thank-you'); // <--- The page you want to redirect your user to.
  }

  render() {

    return (
      <div className="home">
        <div className="join">
          <h2> Join Room </h2>
          <Form />
        </div>

        <div className="create">
          <h2> Create Room </h2>
          <Form />
          <CreateRoomForm />

        </div>
      </div>

    );
  }
}
