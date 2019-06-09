import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";

class App extends Component {
  // Initialize state
  state = { movies: [] };

  // Fetch passwords after first mount
  componentDidMount = () => {
    this.getPasswords();
  };

  getPasswords = () => {
    // Get the passwords and store them in state
    fetch("/api/movies")
      .then(res => res.json())
      .then(movies => {
        this.setState({
          movies: JSON.parse(movies)
        });
      });
  };

  logData = () => {
    console.log(this.state.movies);
  };

  render() {
    return (
      <div className="App">
        <Navbar />
        <img
          onClick={this.logData}
          src={
            "https://image.tmdb.org/t/p/original/" +
            this.state.movies.backdrop_path
          }
        />
      </div>
    );
  }
}

export default App;
