import React from "react";
import { connect } from "react-redux";
import * as actionTypes from "../../store/actionTypes";
import classes from "./MovieCard.module.sass";

const MovieCard = props => {
  const getMovieDetailsData = () => {
    console.log("THE ID IS: " + props.id);
    setTimeout(() => {
      fetch(`/api/movieID/${props.id}`)
        .then(res => res.json())
        .then(movieData => {
          console.log(JSON.parse(movieData).title);
          props.getMovieDetails(JSON.parse(movieData));
          setTimeout(() => {
            props.changeLoadingState(false);
          }, 1000);
        });
    }, 100);
    props.toggleMovieDetails();
  };

  return (
    <div className={classes.movieCardDiv}>
      <h5 className={classes.movieCardGenre}>{props.genre}</h5>
      <img alt="" className={classes.movieCardImage} src={props.imagePath} />
      <div className={classes.movieTitleDiv}>
        <h5 onClick={getMovieDetailsData} className={classes.movieCardTitle}>
          {props.title}
        </h5>
      </div>
    </div>
  );
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
  null,
  mapDispatchToProps
)(MovieCard);
