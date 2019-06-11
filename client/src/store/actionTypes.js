export const GET_GENRES = "GET_GENRES";

export const getGenres = genres => {
  return {
    type: GET_GENRES,
    genres: genres
  };
};
