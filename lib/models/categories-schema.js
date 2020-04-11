'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  name: { type: String, required: true },
  display_name: { type: String, required: true },
  description: { type: String, required: false }
})

const model = mongoose.model('categories', schema);

module.exports = model;