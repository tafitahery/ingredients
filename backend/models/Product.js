const mongoose = require('mongoose');

const schemaProduct = mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  ingredients: [{ _id: String, name: String, qty: Number }],
});

module.exports = mongoose.model('Product', schemaProduct);
