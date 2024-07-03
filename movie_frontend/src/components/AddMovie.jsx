import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/addMovies.scss";
import { editReducer } from "../MovieReducer";

const AddMovie = (props) => {
  const dispatch = useDispatch();
  const editID = useSelector((state) => state.movie.editID);
  const navigate = useNavigate();
  const [state, setState] = useState({
    Overview: "",
    Title: "",
    ReleasedYear: "",
    Genre: "",
  });
  useEffect(() => {
    if (editID) {
      setState({
        Overview: editID.Overview,
        Title: editID.Title,
        ReleasedYear: editID.ReleasedYear,
        Genre: editID.Genre,
      });
    }
  }, []);
  const onClickHandler = async (e) => {
    e.preventDefault();
    if (state.Title === "") {
      alert("Title Cannot be Empty");
    } else {
      console.log(state, e);
      const data = {
        Title: state.Title,
        Released_Year: state.ReleasedYear,
        Genre: state.Genre,
        Description: state.Overview,
      };
      try {
        let response;
        if (editID) {
          response = await axios.put("http://localhost:4000/movie/edit", {
            id: editID.keyValue,
            ...data,
          });
        } else {
          response = await axios.post("http://localhost:4000/movie/add", data);
          dispatch(editReducer(""));
        }
        console.log(response.data.message);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <div className="add">
      <form>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          id="title"
          value={state.Title}
          onChange={(e) => setState({ ...state, Title: e.target.value })}
        />
        <label htmlFor="year">Released Year : </label>
        <input
          type="number"
          name="year"
          id="year"
          value={state.ReleasedYear}
          onChange={(e) => setState({ ...state, ReleasedYear: e.target.value })}
        />
        <label htmlFor="genre">Genre : </label>
        <input
          type="text"
          name="genre"
          id="genre"
          value={state.Genre}
          onChange={(e) => setState({ ...state, Genre: e.target.value })}
        />
        <label htmlFor="overview">Overview : </label>
        <textarea
          name="overview"
          id="overview"
          cols="30"
          rows="10"
          value={state.Overview}
          onChange={(e) => setState({ ...state, Overview: e.target.value })}
        ></textarea>
        <button type="submit" onClick={onClickHandler}>
          {editID ? "Edit" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddMovie;
