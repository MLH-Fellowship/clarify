import React from "react";
import { NotificationManager } from "react-notifications";
import { db } from "../services/firebase";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formValues: {
        user: "",
        question: ""
      },
      formErrors: {
        user: "",
        question: ""
      },
      formValidity: {
        user: false,
        question: false
      },
      isSubmitting: false
    };
  }

  addQuestion = () => {
    const data = {
      ...this.state.formValues,
      uid: this.state.formValues.question
    };
    console.log(data);
    db.collection("questions")
      .doc(data.uid.toString())
      .set(data)
      .then(() => {
        NotificationManager.success("A new question has been asked", "Success");
        window.location = "/";
      })
      .catch(error => {
        NotificationManager.error(error.message, "Addition of question failed");
        this.setState({ isSubmitting: false });
      });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      this.addQuestion();
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      NotificationManager.error(
        "Please check on the validation message below form fields",
        "Validation error"
      );
      this.setState({ isSubmitting: false });
    }
  };

  handleChange = ({ target }) => {
    const { formValues } = this.state;
    formValues[target.name] = target.value;
    this.setState({ formValues });
    this.handleValidation(target);
  };

  handleValidation = target => {
    const { name, value } = target;
    const fieldValidationErrors = this.state.formErrors;
    const validity = this.state.formValidity;
    const isImage = name === "image";

    if (!isImage) {
      validity[name] = value.length > 0;
      fieldValidationErrors[name] = validity[name]
        ? ""
        : `${name} is required and cannot be empty`;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  render() {
    const { formValues, formErrors, isSubmitting } = this.state;
    return (
      <>


        <div className="row mb-5">
          <div className="col-lg-12 text-center">
            <h1 className="mt-5">Register New Question</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Your name</label>
                <input
                  type="text"
                  name="user"
                  className={`form-control ${formErrors.user ? "is-invalid" : ""
                    }`}
                  placeholder="Enter your name"
                  onChange={this.handleChange}
                  value={formValues.user}
                />
                <div className="invalid-feedback">{formErrors.name}</div>
              </div>
              <div className="form-group">
                <label>Question</label>
                <input
                  type="text"
                  name="question"
                  className={`form-control ${formErrors.question ? "is-invalid" : ""
                    }`}
                  placeholder="Enter your question"
                  onChange={this.handleChange}
                  value={formValues.question}
                />
                <div className="invalid-feedback">{formErrors.question}</div>
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Please wait..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </>
    );
  }
}

export default Register;
