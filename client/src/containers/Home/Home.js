import React, { Component } from "react";
import classes from "./Home.module.sass";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";

import LoadingScreen from "../../components/LoadingScreen/LoadingScreen";
import CarouselComp from "../../components/CarouselComp/CarouselComp";
import MovieList from "../../components/MovieList/MovieList";

class Home extends Component {
  state = {
    genres: [],
    loaderDisplay: "block",
    showLoader: true,
    loader: null
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

  render() {
    return (
      <div className={classes.mainHomeDiv}>
        <div>
          <LoadingScreen
            visible={this.state.showLoader}
            display={this.state.loaderDisplay}
          />
          <CarouselComp />
          <MovieList path="popular" title="Popular" />
          <MovieList path="score" title="Highest Avarage Score" />
          <MovieList path="revenue" title="Highest Revenue" />
          <MovieList
            closeLoadingScreen={this.closeLoadingScreen}
            path="upcoming"
            title="Upcoming"
          />
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

const mapDispatchToProps = dispatch => {
  return {
    getGenres: genres => dispatch(actionTypes.getGenres(genres))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
