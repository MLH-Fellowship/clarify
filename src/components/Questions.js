import React from 'react';
import { db } from '../services/firebase';

// Components
import QuestionCard from './QuestionCard';
import QuestionForm from './QuestionForm';

class Questions extends React.Component {

  constructor(props, state) {
    super();
    this.state = {
      questions: []
    };
  }

  componentDidMount() {
    this.getLatestSnapshot();
  }

  getLatestSnapshot() {
    db.collection('rooms').doc(this.props.roomId).collection('questions')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
        data.sort((a, b) => { return b.likes - a.likes || a.created.seconds - b.created.seconds });
        this.setState({ questions: data });
      });
  }

  render() {
    const { questions } = this.state;

    var allQuestions = questions.map(question => {
      return <QuestionCard roomId={this.props.roomId} questionId={question.id} key={question.id} />;
    });

    return (
      <>
        <div style={{ height: "450px", overflowY: "auto" }}>
          {allQuestions}
        </div>
        <QuestionForm roomId={this.props.roomId} />
      </>
    );
  }

}

export default Questions;
