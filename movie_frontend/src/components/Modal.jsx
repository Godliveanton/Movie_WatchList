import React from "react";

const Modal = (props) => {
  const {
    close,
    Overview = "",
    Image = "",
    Title = "",
    ReleasedYear = "",
    Rating = "",
    keyValue = "",
    Genre = "",
  } = props;
  return (
    <div className="modal">
      <form>
        <label htmlFor="title">Title : </label>
        <input type="text" name="title" id="title" value={Title} />
        <label htmlFor="year">Released Year : </label>
        <input type="number" name="year" id="year" value={ReleasedYear} />
        <label htmlFor="genre">Genre : </label>
        <input type="text" name="genre" id="genre" value={Genre} />
        <label htmlFor="overview">Overview : </label>
        <textarea
          name="overview"
          id="overview"
          cols="30"
          rows="10"
          value={Overview}
        ></textarea>
        <button type="submit">Edit</button>
      </form>
    </div>
  );
};

export default Modal;
