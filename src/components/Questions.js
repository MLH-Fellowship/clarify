import React from 'react';
import { NotificationManager } from 'react-notifications';
import { db, firebase } from '../services/firebase';

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

  addQuestion = () => {
    const data = {
      ...this.state.formValues,
      likes: 0,
      created: firebase.firestore.Timestamp.fromDate(new Date())
    };
    db.collection('questions').add(data)
      .then(() => {
        NotificationManager.success('A new question has been asked', 'Success');
        this.setState({ isSubmitting: false });
        this.getLatestSnapshot();
      })
      .catch(error => {
        NotificationManager.error(error.message, 'Addition of question failed');
        this.setState({ isSubmitting: false });
      });
  };

  getLatestSnapshot() {
    db.collection('questions')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
        this.setState({ questions: data });
      });
  }

  render() {
    const { questions } = this.state;

    var allQuestions = questions.map(question => {
      return <QuestionCard questionId={question.id} key={question.id} />;
    });

    return (
      <>
        {allQuestions}
        <>
          <QuestionForm />
        </>
      </>
    );
  }
}

export default Questions;
