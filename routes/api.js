const router = require("express").Router();
const Workout = require("../models/workout");
const Exercise = require("../models/exercise");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts", ({ body }, res) => {
    Workout.aggregate([
        {
            totalDuration: { $sum: "$exercises.duration" }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
  });

  router.get("api/workouts/range", (req, res)=>{
    Workout.aggregate([
        {
                totalDuration: { $sum: "$exercises.duration" },
                totalWeight: { $sum: "$exercises.weight" }
        }
    ])
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        })
  })
  



module.exports = router;