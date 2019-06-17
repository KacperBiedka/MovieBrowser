import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

import classes from "./Search.module.sass";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import MovieCard from "../../components/MovieCard/MovieCard";

class Search extends Component {
  state = {
    movies: [],
    data: []
  };

  componentDidMount = async () => {
    await this.searchForMovies();
  };

  searchForMovies = () => {
    setTimeout(() => {
      fetch(`/api/search/${this.props.search}`)
        .then(res => res.json())
        .then(search => {
          let parsedMovies = JSON.parse(search);
          console.log(parsedMovies);
          this.setState({
            movies: parsedMovies
          });
          let data = [];
          parsedMovies.results.forEach(movie => {
            let genresName = [];
            genresName.push(
              this.props.genres.find(key => key.id === movie.genre_ids[0])
            );
            if (genresName[0] !== undefined && movie.poster_path) {
              data.push({
                imgSrc: "https://image.tmdb.org/t/p/w342/" + movie.poster_path,
                title: movie.title,
                genre: genresName[0].name,
                id: movie.id
              });
            } else if (genresName[0] === undefined && movie.poster_path) {
              data.push({
                imgSrc: null,
                title: movie.title,
                genre: "unknown",
                id: movie.id
              });
            } else {
              console.log(movie.title);
            }
            this.setState({
              data: data
            });
          });
        });
    }, 200);
  };

  render() {
    return (
      <div className={classes.mainSearchDiv}>
        {this.state.data.map(movie => {
          return (
            <MovieCard
              key={movie.imgSrc}
              imagePath={movie.imgSrc}
              title={movie.title}
              genre={movie.genre}
              id={movie.id}
            />
          );
        })}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres,
    search: state.search,
    loading: state.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getMovieDetails: movieDetails =>
      dispatch(actionTypes.getMovieDetails(movieDetails)),
    changeLoadingState: loading =>
      dispatch(actionTypes.changeLoadingState(loading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
