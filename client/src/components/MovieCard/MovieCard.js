import React from "react";
import classes from "./MovieCard.module.sass";

const MovieCard = props => {
  return (
    <div className={classes.movieCardDiv}>
      <h5 className={classes.movieCardGenre}>{props.genre}</h5>
      <img alt="" className={classes.movieCardImage} src={props.imagePath} />
      <h5 className={classes.movieCardTitle}>{props.title}</h5>
    </div>
  );
};

export default MovieCard;
