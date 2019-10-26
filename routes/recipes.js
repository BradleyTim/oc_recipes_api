const express = require("express");
const router = express.Router();

const Recipe = require("../models/recipe");

router.get("/", (req, res, next) => {
  Recipe.find()
    .then(recipes => {
      res.status(200).json(recipes);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.post("/", (req, res, next) => {
  const recipe = new Recipe({
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    ingredients: req.body.ingredients,
    description: req.body.description
  });

  recipe
    .save()
    .then(() => {
      res.status(201).json({ msg: "CREATED SUCESSFULLY" });
    })
    .catch(error => {
      res.status(400).json({
        error: error
      });
    });
});

router.get("/:id", (req, res, next) => {
  Recipe.findOne({ _id: req.params.id })
    .then(recipe => {
      res.status(200).json(recipe);
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.put("/:id", (req, res, next) => {
  const recipeUpdate = new Recipe({
    _id: req.params.id,
    name: req.body.name,
    imageUrl: req.body.imageUrl,
    ingredients: req.body.ingredients,
    description: req.body.description
  });

  Recipe.updateOne({ _id: req.params.id }, recipeUpdate)
    .then(() => {
      res.status(201).json({ msg: "RECIPE UPDATED SUCCESSFULLY" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

router.delete("/:id", (req, res, next) => {
  Recipe.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(200).json({ msg: "RECIPE DELETED" });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
});

module.exports = router;
