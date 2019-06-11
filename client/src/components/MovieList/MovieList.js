import React, { Component } from "react";
import classes from "./MovieList.module.sass";
import { connect } from "react-redux";
import SweetScroll from "sweet-scroll";

import MovieCard from "../MovieCard/MovieCard";

class MovieList extends Component {
  state = {
    movies: [],
    data: [],
    genres: []
  };

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = async () => {
    await this.setState({
      genres: this.props.genres
    });
    fetch(`/api/${this.props.path}`)
      .then(res => res.json())
      .then(movies => {
        const parsedMovies = JSON.parse(movies);
        console.log(parsedMovies);
        this.setState({
          movies: parsedMovies
        });
        let data = [];
        parsedMovies.results.map(movie => {
          let genresName = [];
          genresName.push(
            this.props.genres.find(key => key.id === movie.genre_ids[0])
          );
          console.log(genresName);
          data.push({
            imgSrc: "https://image.tmdb.org/t/p/original/" + movie.poster_path,
            title: movie.title,
            genre: genresName[0].name
          });
          this.setState({
            data: data
          });
        });
      });
  };

  scroller = new SweetScroll(
    {
      duration: 1000
    },
    document.getElementById("container")
  );

  scroll = () => {
    this.scroller.toLeft(-500);
  };

  render() {
    return (
      <div>
        <div className={classes.mainMovieListDiv}>
          <button onClick={this.scroll} className={classes.scrollButton}>
            Scroll
          </button>
          <h5 className={classes.movieListHeader}>{this.props.title}</h5>
          <div id="container" className={classes.movieCardsContainer}>
            {this.state.data.map(movie => {
              return (
                <MovieCard
                  key={movie.imgSrc}
                  imagePath={movie.imgSrc}
                  title={movie.title}
                  genre={movie.genre}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};

export default connect(
  mapStateToProps,
  null
)(MovieList);
