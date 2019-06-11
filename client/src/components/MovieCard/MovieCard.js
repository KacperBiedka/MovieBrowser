import React from "react";
import classes from "./MovieCard.module.sass";

const MovieCard = props => {
  return (
    <div className={classes.movieCardDiv}>
      <img className={classes.movieCardImage} src={props.imagePath} />
      <h5 className={classes.movieCardTitle}>{props.title}</h5>
      <h5 className={classes.movieCardGenre}>
        {props.genre[0] + "/" + props.genre[1]}
      </h5>
    </div>
  );
};

export default MovieCard;
