export const GET_GENRES = "GET_GENRES";
export const GET_DETAILS = "GET_DETAILS";

export const getGenres = genres => {
  return {
    type: GET_GENRES,
    genres: genres
  };
};

export const getMovieDetails = movieDetails => {
  return {
    type: GET_DETAILS,
    movieDetails: movieDetails
  };
};
