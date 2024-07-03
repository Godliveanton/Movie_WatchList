import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  editID: "",
};

const movie = createSlice({
  name: "movie",
  initialState,
  reducers: {
    initReducer: (state, action) => {
      state.movies = action.payload;
    },
    addReducer: (state, action) => {
      state.movies.push(action.payload);
    },
    editReducer: (state, action) => {
      state.editID = action.payload;
    },
    deleteReducer: (state, action) => {
      state.movies = state.movies.filter((val) => val !== action.payload);
    },
  },
});

export default movie.reducer;
export const { initReducer, addReducer, editReducer, deleteReducer } =
  movie.actions;
