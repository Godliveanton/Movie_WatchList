import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/card.scss";
import Stars from "./Stars";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editReducer, deleteReducer } from "../MovieReducer";

const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Overview, Title, ReleasedYear, Rating, keyValue, Watched } = props;
  const [watched, setWatched] = useState(Watched);
  const cardSelect = () => {
    console.log(keyValue);
    dispatch(editReducer(props));
    navigate("/movie");
  };
  const onEditClick = () => {
    dispatch(editReducer(props));
    navigate("/add");
  };
  const onDeleteClick = async () => {
    try {
      const response = await axios
        .delete(`http://localhost:4000/movie/delete?id=${keyValue}`)
        .then(() => console.log(`Deleted document with Id ${keyValue}`));
      dispatch(deleteReducer(keyValue));
      navigate("/");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="card" id={keyValue}>
      <input
        type="checkbox"
        name="watched"
        id="watched"
        value={watched}
        onChange={() => setWatched(!watched)}
      />
      <div className="titleData" onClick={cardSelect}>
        <h3 className="title">
          {Title} ({ReleasedYear})
        </h3>
        <p>{Rating} / 5</p>
        <p className="overview">{Overview}</p>
        <button onClick={onEditClick}>Edit</button>
        <button onClick={onDeleteClick}>Delete</button>
      </div>
    </div>
  );
};

export default Card;
