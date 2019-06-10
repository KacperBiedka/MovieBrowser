import React, { Component } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CarouselComp from "./components/CarouselComp/CarouselComp";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <CarouselComp />
      </div>
    );
  }
}

export default App;
