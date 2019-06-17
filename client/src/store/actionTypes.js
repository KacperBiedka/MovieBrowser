export const GET_GENRES = "GET_GENRES";
export const GET_DETAILS = "GET_DETAILS";
export const CHANGE_LOADING = "CHANGE_LOADING";
export const GET_SEARCH = "GET_SEARCH";
export const GET_SEARCH_MOVIES = "GET_SEARCH_MOVIES";

export const getGenres = genres => {
  return {
    type: GET_GENRES,
    genres: genres
  };
};

export const getSearchValue = search => {
  return {
    type: GET_SEARCH,
    search: search
  };
};

export const getMovieDetails = movieDetails => {
  return {
    type: GET_DETAILS,
    movieDetails: movieDetails
  };
};

export const changeLoadingState = loading => {
  return {
    type: CHANGE_LOADING,
    loading: loading
  };
};

export const getSearchMovies = searchMovies => {
  return {
    type: GET_SEARCH_MOVIES,
    searchMovies: searchMovies
  };
};
