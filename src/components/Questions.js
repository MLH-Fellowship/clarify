import React from 'react';
import { NotificationManager } from 'react-notifications';
import { db, firebase } from '../services/firebase';
import { SendOutlined } from '@ant-design/icons';
import { Input } from 'antd';

// Components
import QuestionCard from './QuestionCard';

class Questions extends React.Component {

  constructor(props, state) {
    super();
    this.state = {
      asking: false,
      questions: [],
      formValues: {
        user: '',
        question: ''
      },
      formErrors: {
        user: '',
        question: ''
      },
      formValidity: {
        user: false,
        question: false
      },
      isSubmitting: false
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

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isSubmitting: true });
    const { formValues, formValidity } = this.state;
    if (Object.values(formValidity).every(Boolean)) {
      this.addQuestion();
      this.setState({ asking: false });
      console.log('not asking');
    } else {
      for (let key in formValues) {
        let target = {
          name: key,
          value: formValues[key]
        };
        this.handleValidation(target);
      }
      NotificationManager.error(
        'Please check on the validation message below form fields',
        'Validation error'
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
    const isImage = name === 'image';

    if (!isImage) {
      validity[name] = value.length > 0;
      fieldValidationErrors[name] = validity[name]
        ? ''
        : `${name} is required and cannot be empty`;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      formValidity: validity
    });
  };

  getLatestSnapshot() {
    db.collection('questions')
      .onSnapshot(querySnapshot => {
        const data = querySnapshot.docs.map(function (doc) { return { ...doc.data(), id: doc.id } });
        this.setState({ questions: data });
      });
  }
  handleAsk() {
    this.setState({ asking: true });
  }

  handleCancel() {
    this.setState({ asking: false });
  }


  render() {
    const { asking, questions, formValues, formErrors, isSubmitting } = this.state;
    const { Search } = Input;

    var allQuestions = questions.map(question => {
      return <QuestionCard questionId={question.id} key={question.id} />;
    });

    return (
      <>
        {allQuestions}
        {/* <>

          <Search placeholder="Write a question..." size='medium' onSearch={value => console.log(value)} bordered={false} enterButton='Ask' />
        </> */}
        <div className='row mb-5'>
          <div className='col-lg-12 text-center'>
            <button
              type='submit'
              className='btn btn-primary btn-block'
              style={{ marginTop: '10px' }}
              disabled={isSubmitting}
              onClick={this.handleAsk.bind(this)}
            >
              Ask something!
              </button>
            {asking === true ? <span><div className='row'>
              <div className='col-lg-12'>
                <form onSubmit={this.handleSubmit}>
                  <div className='form-group'>
                    <label>Your name</label>
                    <input
                      type='text'
                      name='user'
                      className={`form-control ${formErrors.user ? 'is-invalid' : ''
                        }`}
                      placeholder='Enter your name'
                      onChange={this.handleChange}
                      value={formValues.user}
                    />
                    <div className='invalid-feedback'>{formErrors.name}</div>
                  </div>
                  <div className='form-group'>
                    <label>Question</label>
                    <input
                      type='text'
                      name='question'
                      className={`form-control ${formErrors.question ? 'is-invalid' : ''
                        }`}
                      placeholder='Enter your question'
                      onChange={this.handleChange}
                      value={formValues.question}
                    />
                    <div className='invalid-feedback'>{formErrors.question}</div>
                  </div>
                  <button
                    type='submit'
                    className='btn btn-primary btn-block'
                    disabled={isSubmitting}
                    onClick={this.handleSubmit.bind(this)}
                  >
                    {isSubmitting ? 'Please wait...' : 'Submit'}
                  </button>
                  <button
                    type='cancel'
                    className='btn btn-primary btn-block'
                    disabled={isSubmitting}
                    onClick={this.handleCancel.bind(this)}
                  >
                    Cancel
                    </button>
                </form>
              </div>
            </div></span> : null}
          </div>
        </div>
      </>
    );
  }
}

export default Questions;
