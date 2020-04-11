'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  category: { type: String, required: false },
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: false }
})

const model = mongoose.model('products', schema);

module.exports = model;