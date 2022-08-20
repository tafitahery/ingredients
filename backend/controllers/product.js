const Product = require('../models/Product');

exports.createProduct = (req, res, next) => {
  const product = new Product({
    ...req.body,
  });
  product
    .save()
    .then(() => res.status(201).json({ message: 'Produit enregistré !' }))
    .catch((error) => res.status(400).json({ error }));
};
