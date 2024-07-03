import { configureStore } from "@reduxjs/toolkit";
import MovieReducer from "./MovieReducer";

const store = configureStore({
  reducer: {
    movie: MovieReducer,
  },
});

export default store;
