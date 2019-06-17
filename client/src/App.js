import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar/Navbar";
import Home from "./containers/Home/Home";
import Search from "./containers/Search/Search";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/search" component={Search} />
          <Route exact path="/" component={Home} />
        </Switch>
      </div>
    );
  }
}

export default App;
