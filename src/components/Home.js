import React from "react";
import "../styles/home.css";
import Form from "./Form";
import { Layout } from 'antd';

import CreateRoomForm from "./CreateRoomForm";

const { Header, Content } = Layout;

export default class Home extends React.Component {

  submitForm(e) {
    e.preventDefault()
    this.props.history.push('/thank-you'); // <--- The page you want to redirect your user to.
  }

  render() {

    return (
      <Layout>
        <Header id = 'title' style={{backgroundColor: 'lightblue', height:'10vh', fontFamily: 'sans-serif', fontSize:'20px'
                        , color: '#00134d', paddingLeft: '40px', verticalAlign:'center'}}>Clarify</Header>
        <Content id = 'content' style={{height: '90vh', backgroundColor: 'lightblue'}}>
              <div></div>
              <div className="create">
                  <CreateRoomForm />
              </div>        
              
              <div className="join">
                  <h5 style={{color: "#00134d"}}>Enter an existing room code</h5>
                  <Form />
              </div>
        </Content>

      
      </Layout>
    );
  }
}
