const express = require("express");
const { movie_details } = require("./movie_schema.js");

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const result = await movie_details.find({
      Title: { $regex: req.query.Title, $options: "i" },
    });
    if (result.length === 0) {
      throw new Error("No Result Found");
    }
    return res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(404).json({
      message: `${err}`,
    });
  }
});

router.post("/add", async (req, res) => {
  try {
    const movie = new movie_details({
      Title: req.body.Title,
      Released_Year: req.body.Released_Year,
      Genre: req.body.Genre,
      Description: req.body.Description,
    });
    console.log(req.body);
    const result = await movie.save();

    return res.status(200).json({
      message: result,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: `${err}`,
    });
  }
});

router.put("/edit", async (req, res) => {
  try {
    const result = await movie_details.updateOne(
      { _id: req.body.id },
      {
        Title: req.body.Title,
        Released_Year: req.body.Released_Year,
        Genre: req.body.Genre,
        Description: req.body.Description,
      }
    );

    return res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(401).json({
      message: `${err}`,
    });
  }
});

router.put("/editRatingReview", async (req, res) => {
  try {
    const result = await movie_details.updateOne(
      { _id: req.query.id },
      {
        Rating: req.query.Rating,
        Review: req.query.Review,
      }
    );

    console.log(req, result);
    return res.status(200).json({
      message: result,
    });
  } catch (err) {
    console.log(err);
    res.status(401).json({
      message: `${err}`,
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const result = await movie_details.deleteOne({ _id: req.query.id });

    return res.status(200).json({
      message: result,
    });
  } catch (err) {
    res.status(401).json({
      message: `${err}`,
    });
  }
});

exports.movie_routes = router;
