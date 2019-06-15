import * as actionTypes from "./actionTypes";

const initialState = {
  genres: [],
  movieDetails: {}
};

const getGenres = (state = initialState, action) => {
  const genres = action.genres;
  return {
    ...state,
    ...genres
  };
};

const getMovieDetails = (state = initialState, action) => {
  const movieDetails = action.movieDetails;
  return {
    ...state,
    movieDetails
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENRES:
      return getGenres(state, action);
    case actionTypes.GET_DETAILS:
      return getMovieDetails(state, action);
    default:
      return state;
  }
};

export default reducer;
