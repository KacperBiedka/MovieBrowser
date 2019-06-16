import * as actionTypes from "./actionTypes";

const initialState = {
  genres: [],
  movieDetails: {},
  loading: true
};

const getGenres = (state = initialState, action) => {
  const genres = action.genres;
  return {
    ...state,
    ...genres
  };
};

const getSearchValue = (state = initialState, action) => {
  const search = action.search;
  return {
    ...state,
    search
  };
};

const getMovieDetails = (state = initialState, action) => {
  const movieDetails = action.movieDetails;
  return {
    ...state,
    movieDetails
  };
};

const changeLoadingState = (state = initialState, action) => {
  const loading = action.loading;
  return {
    ...state,
    loading
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENRES:
      return getGenres(state, action);
    case actionTypes.GET_DETAILS:
      return getMovieDetails(state, action);
    case actionTypes.CHANGE_LOADING:
      return changeLoadingState(state, action);
    case actionTypes.GET_SEARCH:
      return getSearchValue(state, action);
    default:
      return state;
  }
};

export default reducer;
