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
    displayContent: "none",
    showLoader: true,
    loader: <LoadingScreen visible={this.showLoader} />
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
      showLoader: false,
      displayContent: "block"
    });
    setTimeout(() => {
      this.setState({
        loader: null
      });
    }, 1000);
  };

  render() {
    return (
      <div className={classes.mainHomeDiv}>
        {this.state.loader}
        <div style={{ display: this.state.displayContent }}>
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
