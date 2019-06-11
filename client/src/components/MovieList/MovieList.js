import React, { Component } from "react";
import classes from "./MovieList.module.sass";

import MovieCard from "../MovieCard/MovieCard";

class MovieList extends Component {
  state = {
    movies: [],
    data: []
  };

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    fetch(`/api/${this.props.path}`)
      .then(res => res.json())
      .then(movies => {
        console.log(JSON.parse(movies));
        this.setState({
          movies: JSON.parse(movies)
        });
        let data = [];
        JSON.parse(movies).results.map(movie => {
          data.push({
            imgSrc: "https://image.tmdb.org/t/p/original/" + movie.poster_path,
            title: movie.title,
            genre: movie.genre_ids
          });
          this.setState({
            data: data
          });
        });
      });
  };

  render() {
    return (
      <div className={classes.mainMovieListDiv}>
        {this.state.data.map(movie => {
          return (
            <MovieCard
              imagePath={movie.imgSrc}
              title={movie.title}
              genre={movie.genre}
            />
          );
        })}
      </div>
    );
  }
}

export default MovieList;
