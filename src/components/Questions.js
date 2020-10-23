import React from 'react';
import { db } from '../services/firebase';

// Components
import QuestionCard from './QuestionCard';
import QuestionForm from './QuestionForm';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

class Questions extends React.Component {

  constructor(props, state) {
    super();
    this.state = {
      questions: [],
      loading: true
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
        this.setState({ loading: false });
      });
  }

  render() {
    const { questions, loading } = this.state;
    const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

    var allQuestions = questions.map(question => {
      return <QuestionCard roomId={this.props.roomId} questionId={question.id} key={question.id} />;
    });

    return (
      <>
        <div className='question-container'>
          {
            loading
              ? <div className='question-container-empty'><Spin indicator={antIcon} /></div>
              : questions.length > 0
                ? allQuestions
                : <div className='question-container-empty'>
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
