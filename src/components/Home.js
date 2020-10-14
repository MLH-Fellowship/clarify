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
        <Header id = 'title' style={{backgroundColor: 'lightblue', height:'15vh', paddingLeft: '40px', verticalAlign:'center'}}>
        <h1 style={{ fontFamily:'sans-serif', fontSize: '80px', color: '#ffffff'}}>clarify</h1></Header>
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
