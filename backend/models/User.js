const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const schemaUser = mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

schemaUser.plugin(uniqueValidator);

module.exports = mongoose.model('User', schemaUser);
