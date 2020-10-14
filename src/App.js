import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Room from './components/Room'
import Home from './components/Home'

function App() {
<<<<<<< HEAD

  return (
    <div className="App" style={{ backgroundColor: 'white', height: "100%" }}>
=======
  return (
    <div className='App'>
>>>>>>> b9ee5fafe9f0e0c44a74d6f4638e49e4c20c0d1c
      <Router>
        <Switch>
          <Route path='/' exact component={() => <Home />} />
          <Route path='/:id' children={<Room />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App; 