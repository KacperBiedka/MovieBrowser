import React, { Component } from "react";
import classes from "./MovieList.module.sass";
import { connect } from "react-redux";
import Slider from "react-slick";

import MovieCard from "../MovieCard/MovieCard";

class MovieList extends Component {
  state = {
    movies: [],
    data: [],
    genres: []
  };

  componentDidMount = () => {
    this.getMovies();
  };

  getMovies = () => {
    setTimeout(() => {
      fetch(`/api/${this.props.path}`)
        .then(res => res.json())
        .then(movies => {
          const parsedMovies = JSON.parse(movies);
          this.setState({
            movies: parsedMovies
          });
          console.log(parsedMovies);
          let data = [];
          parsedMovies.results.forEach(movie => {
            let genresName = [];
            genresName.push(
              this.props.genres.find(key => key.id === movie.genre_ids[0])
            );
            data.push({
              imgSrc: "https://image.tmdb.org/t/p/w342/" + movie.poster_path,
              title: movie.title,
              genre: genresName[0].name,
              id: movie.id
            });
            this.setState({
              data: data
            });
          });
        })
        .then(() => {
          if (this.props.closeLoadingScreen) {
            this.props.closeLoadingScreen();
          }
        });
    }, 100);
  };

  settings = {
    dots: false,
    slidesToShow: 5,
    speed: 400,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  render() {
    return (
      <div>
        <div className={classes.mainMovieListDiv}>
          <h5 className={classes.movieListHeader}>{this.props.title}</h5>
          <Slider className={classes.movieCardsContainer} {...this.settings}>
            {this.state.data.map(movie => {
              return (
                <MovieCard
                  toggleMovieDetails={this.props.toggleMovieDetails}
                  key={movie.imgSrc}
                  imagePath={movie.imgSrc}
                  title={movie.title}
                  genre={movie.genre}
                  id={movie.id}
                />
              );
            })}
          </Slider>
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

export default connect(
  mapStateToProps,
  null
)(MovieList);
