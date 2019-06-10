const express = require("express");
const path = require("path");
const request = require("request");

const app = express();

const baseURL = "https://api.themoviedb.org/3";
const key = "api_key=04c05e4935a42d8b5a5c5079e20e4c77";

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
request(
  `https://api.themoviedb.org/3/discover/movie?api_key=04c05e4935a42d8b5a5c5079e20e4c77&release_date.gte=2019-04-01&release_date.lte=2019-06-10&sort_by=popularity.desc`,
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

app.get("/api/movies", (req, res, next) => {
  res.json(movies);
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "/client/build/index.html"));
// });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Password generator listening on ${port}`);
