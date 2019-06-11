import * as actionTypes from "./actionTypes";

const initialState = {
  genres: []
};

const getGenres = (state = initialState, action) => {
  const genres = action.genres;
  return {
    ...state,
    ...genres
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_GENRES:
      return getGenres(state, action);
    default:
      return state;
  }
};

export default reducer;
