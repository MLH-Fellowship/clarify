import React from 'react';
import { NotificationManager } from 'react-notifications';
import { db, firebase, getQuestionsSnapshot, getQuestions } from '../services/firebase';

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
    // collectionName = Collection();
    db.collection('rooms').doc(this.props.roomId).collection('questions')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
        data.sort((a, b) => { return b.likes - a.likes || a.created.seconds - b.created.seconds });
        this.setState({ questions: data });
      });

    // const questions = getQuestions(this.props.roomId);
    // console.log(questions);
    // this.setState({ questions: questions });
  }

  render() {
    const { questions } = this.state;
    var allQuestions = questions.map(question => {
      return <QuestionCard roomId={this.props.roomId} questionId={question.id} key={question.id} />;
    });

    return (
      <>
        {allQuestions}
        <>
          <QuestionForm roomId={this.props.roomId} />
        </>
      </>
    );
  }
}

export default Questions;
