const router = require("express").Router();
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

router.post("/api/workout", ({ body }, res) => {
  Workout.create(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.post("/api/Exercise/bulk", ({ body }, res) => {
  Exercise.insertMany(body)
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/Exercise", (req, res) => {
  Exercise.find({})
    .sort({ date: -1 })
    .then(dbExercise => {
      res.json(dbExercise);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;