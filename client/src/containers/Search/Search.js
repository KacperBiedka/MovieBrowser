import React, { Component } from "react";
import classes from "./Search.module.sass";
import { connect } from "react-redux";
import { Fade } from "react-reveal";
import * as actionTypes from "../../store/actionTypes";

import Navbar from "../../components/Navbar/Navbar";
import MovieCard from "../../components/MovieCard/MovieCard";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

class Search extends Component {
  state = {
    movies: [],
    data: [],
    genres: [],
    shakeMessage: "",
    movieDetails: null,
    loading: true
  };

  componentDidMount = () => {
    this.getGenres();
    this.searchForMovies();
  };

  getGenres = () => {
    fetch(`/api/genres`)
      .then(res => res.json())
      .then(genres => {
        const genresParsed = JSON.parse(genres);
        console.log(genresParsed);
        this.setState({
          genres: genresParsed
        });
      });
  };

  searchForMovies = () => {
    if (this.props.search.trim()) {
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
              data: data,
              loading: false
            });
            this.props.getSearchValue("");
          });
        });
    } else {
      this.setState({
        loading: false
      });
      console.log("there is no value to search for");
    }
  };

  submitSearchValue = async path => {
    if (path.trim()) {
      fetch(`/api/search/${path}`)
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
              this.state.genres.genres.find(
                key => key.id === movie.genre_ids[0]
              )
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
                imgSrc: "https://image.tmdb.org/t/p/w342/" + movie.poster_path,
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
    } else {
      console.log("incorrect path");
    }
  };

  toggleMovieDetails = () => {
    if (this.state.movieDetails) {
      this.setState({
        movieDetails: null
      });
    } else {
      this.setState({
        movieDetails: (
          <MovieDetails
            animated={true}
            toggleMovieDetails={this.toggleMovieDetails}
          />
        )
      });
    }
  };

  render() {
    return (
      <>
        <Navbar showChevron={true} submitSearchValue={this.submitSearchValue} />
        {this.state.movieDetails}
        <div className={classes.mainSearchDiv}>
          {this.state.data.length === 0 && !this.state.loading ? (
            <div className={classes.messageDiv}>
              <h5 className={classes.messageHeader}>Enter a movie name</h5>
            </div>
          ) : null}
          {this.state.data.map(movie => {
            return (
              <div className={classes.cardDiv}>
                <Fade>
                  <MovieCard
                    toggleMovieDetails={this.toggleMovieDetails}
                    key={movie.imgSrc + movie.title}
                    imagePath={movie.imgSrc}
                    title={movie.title}
                    genre={movie.genre}
                    id={movie.id}
                  />
                </Fade>
              </div>
            );
          })}
        </div>
      </>
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
      dispatch(actionTypes.changeLoadingState(loading)),
    getSearchValue: search => dispatch(actionTypes.getSearchValue(search))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
