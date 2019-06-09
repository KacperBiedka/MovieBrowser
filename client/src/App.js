import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  // Initialize state
  state = { passwords: [] };

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords();
  }

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/api/passwords")
      .then(res => res.json())
      .then(passwords => this.setState({ passwords }));
  };

  render() {
    const { passwords } = this.state;

    return (
      <div className="App">
        <Navbar />
      </div>
    );
  }
}

export default App;
