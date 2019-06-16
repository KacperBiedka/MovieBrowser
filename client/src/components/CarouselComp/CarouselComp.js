import React, { Component } from "react";
import { connect } from "react-redux";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import * as actionTypes from "../../store/actionTypes";
import classes from "./CarouselComp.module.sass";

class CarouselComp extends Component {
  state = {
    movies: [],
    data: []
  };

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    fetch("/api/latest")
      .then(res => res.json())
      .then(movies => {
        console.log(JSON.parse(movies));
        this.setState({
          movies: JSON.parse(movies)
        });
        let data = [];
        JSON.parse(movies).results.forEach(movie => {
          data.push({
            imgSrc:
              "https://image.tmdb.org/t/p/original/" + movie.backdrop_path,
            title: movie.title,
            id: movie.id
          });
          this.setState({
            data: data
          });
        });
      });
  };

  getMovieDetailsData = id => {
    console.log(this.state.movies);
    console.log(this.state.data);
    // console.log(this.state.data[1]);
    console.log("THE ID IS: " + id);
    setTimeout(() => {
      fetch(`/api/movieID/${id}`)
        .then(res => res.json())
        .then(movieData => {
          console.log(JSON.parse(movieData).title);
          this.props.getMovieDetails(JSON.parse(movieData));
          setTimeout(() => {
            this.props.changeLoadingState(false);
          }, 1000);
        });
    }, 100);
    this.props.toggleMovieDetails();
  };

  render() {
    return (
      <Carousel
        showIndicators={false}
        showThumbs={false}
        showStatus={false}
        infiniteLoop={true}
        autoPlay={true}
      >
        {this.state.data.map(img => {
          return (
            <div key={img.imgSrc} className={classes.imageDiv}>
              <img alt="" className={classes.carouselImage} src={img.imgSrc} />
              <h5 className={"legend " + classes.carouselHeader}>
                {img.title}
              </h5>
              <h5
                onClick={() => this.getMovieDetailsData(img.id)}
                className={"legend " + classes.carouselLegend}
              >
                See details
              </h5>
            </div>
          );
        })}
      </Carousel>
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
    getMovieDetails: movieDetails =>
      dispatch(actionTypes.getMovieDetails(movieDetails)),
    changeLoadingState: loading =>
      dispatch(actionTypes.changeLoadingState(loading))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CarouselComp);
