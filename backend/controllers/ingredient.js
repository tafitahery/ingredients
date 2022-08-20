const Ingredient = require('../models/Ingredient');

exports.createIngredient = (req, res, next) => {
  const ingredient = new Ingredient({
    ...req.body,
  });
  ingredient
    .save()
    .then(() => res.status(201).json({ message: 'Ingredient enrgistré !' }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllIngredients = (req, res, next) => {
  Ingredient.find()
    .then((ingredients) => res.status(200).json(ingredients))
    .catch((error) => res.status(400).json({ error }));
};

exports.getOneIngredient = (req, res, next) => {
  Ingredient.findOne({ _id: req.params.id })
    .then((ingredient) => res.status(200).json(ingredient))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyIngredient = (req, res, next) => {
  Ingredient.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Ingredient modifié !' }))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteIngredient = (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Ingredient supprimé !' }))
    .catch((error) => res.status(404).json({ error }));
};
