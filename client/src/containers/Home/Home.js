import React from "react";
import classes from "./Home.module.sass";

import CarouselComp from "../../components/CarouselComp/CarouselComp";
import MovieList from "../../components/MovieList/MovieList";

const Home = props => {
  return (
    <div className={classes.mainHomeDiv}>
      <CarouselComp />
      <MovieList path="popular" />
      <MovieList path="score" />
      <MovieList path="revenue" />
      <MovieList path="popular" />
    </div>
  );
};

export default Home;
