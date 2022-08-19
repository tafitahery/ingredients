const express = require('express');
const mongoose = require('mongoose');

const Ingredient = require('./models/Ingredient.js');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/ingredient', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB echouée !'));

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.post('/api/ingredients', (req, res, next) => {
  const ingredient = new Ingredient({
    ...req.body,
  });
  ingredient
    .save()
    .then(() => res.status(201).json({ message: 'Ingredient enrgistré !' }))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/ingredients', (req, res, next) => {
  Ingredient.find()
    .then((ingredients) => res.status(200).json(ingredients))
    .catch((error) => res.status(400).json({ error }));
});

app.get('/api/ingredients/:id', (req, res, next) => {
  Ingredient.findOne({ _id: req.params.id })
    .then((ingredient) => res.status(200).json(ingredient))
    .catch((error) => res.status(400).json({ error }));
});

app.put('/api/ingredients/:id', (req, res, next) => {
  Ingredient.updateOne(
    { _id: req.params.id },
    { ...req.body, _id: req.params.id }
  )
    .then(() => res.status(200).json({ message: 'Ingredient modifié !' }))
    .catch((error) => res.status(404).json({ error }));
});

app.delete('/api/ingredients/:id', (req, res, next) => {
  Ingredient.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Ingredient supprimé !' }))
    .catch((error) => res.status(404).json({ error }));
});

module.exports = app;
