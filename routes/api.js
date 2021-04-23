const router = require("express").Router();
const Workout = require("../models/workout");

router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
        {
           $addFields: {
            totalDuration: { $sum: "$exercises.duration" },
            totalWeight: { $sum: "$exercises.weight" }
        }
            
        }
    ])
    .limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
});

router.put("/workouts/:id", ({ params, body }, res) => {
    Workout.findOneAndUpdate([
        { _id: params.id },
        { $push: { exercises: body } },
        { upsert: true }])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})

module.exports = router;