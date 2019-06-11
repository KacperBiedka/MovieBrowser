const express = require("express");
const path = require("path");
const request = require("request");

const app = express();

const baseURL = "https://api.themoviedb.org/3";
const key = "api_key=04c05e4935a42d8b5a5c5079e20e4c77";

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
// Get latest movies

request(
  `https://api.themoviedb.org/3/movie/now_playing?${key}&language=en-US&page=1`,
  (error, response, body) => {
    if (!error) {
      movies = body;
      console.log(JSON.parse(body));
      return movies;
    } else {
      console.log(error);
    }
  }
);

app.get("/api/latest", (req, res, next) => {
  res.json(movies);
});

// Get most popular movies

request(
  `https://api.themoviedb.org/3/discover/movie?${key}&sort_by=popularity.desc`,
  (error, response, body) => {
    if (!error) {
      popular = body;
      console.log(JSON.parse(body));
      return popular;
    } else {
      console.log(error);
    }
  }
);

app.get("/api/popular", (req, res, next) => {
  res.json(popular);
});

// Get movies with the biggest revenue

request(
  `https://api.themoviedb.org/3/discover/movie?${key}&language=en-US&sort_by=revenue.desc&include_adult=true&include_video=false&page=1`,
  (error, response, body) => {
    if (!error) {
      revenue = body;
      console.log(JSON.parse(body));
      return revenue;
    } else {
      console.log(error);
    }
  }
);

app.get("/api/revenue", (req, res, next) => {
  res.json(revenue);
});

// Get movies with the highest rating

request(
  `https://api.themoviedb.org/3/discover/movie?${key}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000`,
  (error, response, body) => {
    if (!error) {
      score = body;
      console.log(JSON.parse(body));
      return score;
    } else {
      console.log(error);
    }
  }
);

app.get("/api/score", (req, res, next) => {
  res.json(score);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
