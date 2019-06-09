const express = require("express");
const path = require("path");
const request = require("request");

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));

// Put all API endpoints under '/api'
request(
  "https://api.themoviedb.org/3/movie/550?api_key=04c05e4935a42d8b5a5c5079e20e4c77",
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
