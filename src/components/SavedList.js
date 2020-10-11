import React from "react";
import { db } from "../services/firebase";
import { Button } from '@material-ui/core';
class SavedList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getLatestSnapshot();
  }
  
  getLatestSnapshot() {
    db.collection("questions")
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ questions: data });
      });
  }
 
  handleClick(question) {
    db.collection("questions").doc(question).delete().then(() => {
      console.log("Document successfully deleted!");
      this.getLatestSnapshot();
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
  };

  render() {
    const { questions } = this.state;
    return (
      <div className="row">
        {questions.map(question => (
          <div key={question.uid} className="col-lg-6 col-md-6 col-s-12 mb-4">
            <div className="card h-100">
              <div className="card">
                <div className="card-body">
                  <h5>{question.user}</h5>
                  <h6>{question.question}</h6>
                  <Button variant="outlined" color="primary" onClick={this.handleClick.bind(this, question.question)}>
                    Resolve
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default SavedList;
