import React from "react";
import { connect } from "react-redux";
import { Zoom } from "react-reveal";
import classes from "./MovieDetails.module.sass";

const MovieDetails = props => {
  return (
    <Zoom>
      <div
        style={{
          background: `url(https://image.tmdb.org/t/p/original/${
            props.movieDetails.backdrop_path
          })`
        }}
        className={classes.movieDetailsMainDiv}
      >
        <div className={classes.opacityLayerDiv}>
          <div className={classes.titleSectionDiv}>
            <i class="fas fa-chevron-left" />
            <div className={classes.movieTitleDiv}>
              <h5 className={classes.movieTitleHeader}>
                {props.movieDetails.title}
              </h5>
            </div>
            <div className={classes.movieDescribtionDiv}>
              <p className={classes.movieDescribtionText}>
                {props.movieDetails.overview}
              </p>
            </div>
          </div>
          <div className={classes.infoSectionDiv}>
            <div className={classes.movieInfoDiv}>
              <ul>
                <li>Release Date: {props.movieDetails.release_date}</li>
                <li>
                  Production: {props.movieDetails.production_companies[0].name}
                </li>
                <li>
                  Runtime: {parseInt(props.movieDetails.runtime / 60)} hours{" "}
                  {props.movieDetails.runtime -
                    parseInt(props.movieDetails.runtime / 60) * 60}{" "}
                  minutes
                </li>
                <li>Avarage rating: {props.movieDetails.vote_average}</li>
                <li>Budget: {props.movieDetails.budget}</li>
                <li>
                  Revenue:{" "}
                  {props.movieDetails.revenue === 0
                    ? "No data available yet"
                    : props.movieDetails.revenue}
                </li>
                <li>
                  Genres:{" "}
                  {props.movieDetails.genres.map((genre, index) => {
                    if (index === props.movieDetails.genres.length - 1) {
                      return genre.name;
                    } else {
                      return genre.name + ", ";
                    }
                  })}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Zoom>
  );
};

const mapStateToProps = state => {
  return {
    genres: state.genres,
    movieDetails: state.movieDetails
  };
};

export default connect(
  mapStateToProps,
  null
)(MovieDetails);
