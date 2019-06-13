import React, { Component } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
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
            title: movie.title
          });
          this.setState({
            data: data
          });
        });
      });
  };

  logData = () => {
    console.log(this.state.movies);
    console.log(this.state.data);
    console.log(this.state.data[1]);
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
              <img
                alt=""
                className={classes.carouselImage}
                onClick={this.logData}
                src={img.imgSrc}
              />
              <h5 className={"legend " + classes.carouselHeader}>
                {img.title}
              </h5>
              <h5 className={"legend " + classes.carouselLegend}>
                See details
              </h5>
            </div>
          );
        })}
      </Carousel>
    );
  }
}

export default CarouselComp;
