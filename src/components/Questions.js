import React from 'react';
import { db } from '../services/firebase';

// Components
import QuestionCard from './QuestionCard';
import QuestionForm from './QuestionForm';
import { SmileOutlined } from '@ant-design/icons';

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

    console.log(questions);

    return (
      <>
        <div className='question-container'>
          {
            questions.length > 0 ? allQuestions :
              <div id='question-container-empty'>
                <div style={{ fontSize: 24, color: '#e1e3ec' }}>Ask the first question</div>
                <div style={{ fontSize: 14, color: '#e1e3ec' }}>Submit using the box below</div>
              </div>
          }
        </div>
        <QuestionForm roomId={this.props.roomId} />
      </>
    );
  }

}

export default Questions;
