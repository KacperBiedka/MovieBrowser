import React, { Component } from "react";
import classes from "./Home.module.sass";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

import Navbar from "../../components/Navbar/Navbar";
import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import CarouselComp from "../../components/CarouselComp/CarouselComp";
import MovieList from "../../components/MovieList/MovieList";
import MovieDetails from "../../components/MovieDetails/MovieDetails";

class Home extends Component {
  state = {
    genres: [],
    loaderDisplay: "block",
    showLoader: true,
    loader: null,
    movieDetails: null
  };

  componentDidMount = () => {
    this.getGenres();
    this.getSpecifiedMovie();
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
        this.props.getGenres(genresParsed);
      });
  };

  getSpecifiedMovie = () => {
    fetch(`/api/movieID/111`)
      .then(res => res.json())
      .then(movieData => {
        console.log(JSON.parse(movieData));
      });
  };

  closeLoadingScreen = () => {
    this.setState({
      showLoader: false
    });
    setTimeout(() => {
      this.setState({
        loaderDisplay: "none"
      });
    });
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

  submitSearchValue = searchValue => {
    this.props.getSearchValue(searchValue);
  };

  render() {
    return (
      <>
        <Navbar submitSearchValue={this.submitSearchValue} />
        <div className={classes.mainHomeDiv}>
          <div>
            <LoadingScreen
              visible={this.state.showLoader}
              display={this.state.loaderDisplay}
            />
            {this.state.movieDetails}
            <CarouselComp toggleMovieDetails={this.toggleMovieDetails} />
            <MovieList
              toggleMovieDetails={this.toggleMovieDetails}
              path="popular"
              title="Popular"
            />
            <MovieList
              toggleMovieDetails={this.toggleMovieDetails}
              closeLoadingScreen={this.closeLoadingScreen}
              path="keanu"
              title="Movies with Keanu Reeves"
            />
            <MovieList
              toggleMovieDetails={this.toggleMovieDetails}
              path="score"
              title="Highest Avarage Score"
            />
            <MovieList
              toggleMovieDetails={this.toggleMovieDetails}
              path="revenue"
              title="Highest Revenue"
            />
            <MovieList
              toggleMovieDetails={this.toggleMovieDetails}
              closeLoadingScreen={this.closeLoadingScreen}
              path="upcoming"
              title="Upcoming"
            />
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getGenres: genres => dispatch(actionTypes.getGenres(genres)),
    getSearchValue: search => dispatch(actionTypes.getSearchValue(search))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
