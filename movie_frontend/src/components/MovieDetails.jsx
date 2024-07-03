import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { editReducer, deleteReducer } from "../MovieReducer";

const MovieDetails = () => {
  const editID = useSelector((state) => state.movie.editID);
  const [state, setState] = useState({
    Overview: editID.Overview,
    Title: editID.Title,
    ReleasedYear: editID.ReleasedYear,
    Genre: editID.Genre,
    Rating: editID.Rating,
    Review: editID.Review,
    id: editID.keyValue,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onEditClick = () => {
    dispatch(editReducer(state));
    navigate("/add");
  };
  const onDeleteClick = async () => {
    try {
      const response = await axios
        .delete(`http://localhost:4000/movie/delete?id=${state.id}`)
        .then(() => console.log(`Deleted document with Id ${state.id}`));
      dispatch(deleteReducer(state.id));
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  const onRatingChange = (e) => {
    if (e.target.value > 5 || e.target.value < 0) {
      alert("Rating should between 1 to 5");
      setState({ ...state, Rating: 1 });
    } else {
      setState({ ...state, Rating: Number(e.target.value) });
    }
  };
  const onSave = async () => {
    try {
      await axios
        .put(
          `http://localhost:4000/movie/editRatingReview?id=${state.id}&Rating=${state.Rating}&Review=${state.Review}`
        )
        .then((res) => console.log(res));
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div>
      <div className="titleData">
        <h3>
          {state.Title} ({state.ReleasedYear})
        </h3>
        <p>Genre = {state.Genre}</p>
        <p>{state.Overview}</p>
        <button onClick={onEditClick}>Edit Details</button>
        <button onClick={onDeleteClick}>Delete Movie</button>
        <p>
          <input
            type="number"
            name="rating"
            id="rating"
            value={state.Rating}
            onChange={onRatingChange}
          />
          / 5
        </p>
        <p>
          <textarea
            name="review"
            id="review"
            cols="30"
            rows="10"
            value={state.Review}
            onChange={(e) => setState({ ...state, Review: e.target.value })}
          ></textarea>
        </p>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};

export default MovieDetails;
