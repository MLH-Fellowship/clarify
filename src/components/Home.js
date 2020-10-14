import React from "react";
import "../styles/home.css";
import Form from "./Form";
import { Layout } from 'antd';

import CreateRoomForm from "./CreateRoomForm";
import JoinRoomForm from './JoinRoomForm';
const { Header, Content } = Layout;

function Home() {
  return (
    <Layout>
      <Header id='title' style={{
        backgroundColor: 'lightblue', height: '10vh', fontSize: '20px'
        , color: 'white', paddingLeft: '40px', verticalAlign: 'center'
      }}>Clarify</Header>
      <Content id='content' style={{ height: '90vh', backgroundColor: 'lightblue' }}>
        <div></div>
        <div className="create">
          <CreateRoomForm />
        </div>

        <div className="join">
          <h5 style={{ color: "#00134d" }}>Enter an existing room code</h5>
          <JoinRoomForm />
        </div>
      </Content>


    </Layout>
  );

}

export default Home;