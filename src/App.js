import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import { Navigation, Footer, About, Contact } from "./components";
import Room from "./components/Room"
import Home from "./components/Home"

function App() {

   return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={() => <Home />} />
          <Route path="/:id" children={<Room />} />
        </Switch>
      </Router>
    </div>
  );
}

export default App; 