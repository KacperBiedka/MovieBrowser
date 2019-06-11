import React, { Component } from "react";
import classes from "./Home.module.sass";

import CarouselComp from "../../components/CarouselComp/CarouselComp";
import MovieList from "../../components/MovieList/MovieList";

class Home extends Component {
  state = {
    genres: []
  };

  componentDidMount = () => {
    this.getGenres();
  };

  getGenres = () => {
    fetch(`/api/genres`)
      .then(res => res.json())
      .then(genres => {
        console.log(JSON.parse(genres));
        this.setState({
          genres: JSON.parse(genres)
        });
      });
  };

  render() {
    return (
      <div className={classes.mainHomeDiv}>
        <CarouselComp />
        <MovieList path="popular" />
        <MovieList path="score" />
        <MovieList path="revenue" />
        <MovieList path="popular" />
      </div>
    );
  }
}

export default Home;
