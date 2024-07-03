import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.scss";
import Card from "./Card";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { initReducer, addReducer } from "../MovieReducer";

const Home = () => {
  const movieList = useSelector((state) => state.movie.movies);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [moviesResult, setmoviesResult] = useState([]);
  const fetchData = async (url, params = {}) => {
    try {
      const response = await axios.get(url, { params });
      return response.data.message;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  const searchResult = async () => {
    const result = await fetchData("http://localhost:4000/movie/search", {
      Title: search,
    });
    console.log(result);
    setmoviesResult(result);
    return result;
  };
  useEffect(() => {
    const initFunc = async () => {
      let result = await searchResult();
      dispatch(initReducer(result));
    };
    initFunc();
  }, []);
  return (
    <div className="home">
      <h1>Watchlist</h1>
      <input
        type="search"
        name="movieName"
        id="movieName"
        placeholder="Search Movie By Title"
        value={search}
        className="search"
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchResult} className="search">
        Search
      </button>

      <h1>Movie List</h1>
      <button onClick={() => navigate("/add")}>Add Movies</button>
      <div className="columnArrange">
        {moviesResult
          ? moviesResult.map((val) => {
              return (
                <Card
                  Title={val.Title}
                  ReleasedYear={val.Released_Year}
                  Rating={val.Rating}
                  Overview={val.Description}
                  keyValue={val._id}
                  Genre={val.Genre}
                  Review={val.Review}
                  Watched={val.watched}
                />
              );
            })
          : null}
      </div>
    </div>
  );
};

export default Home;
