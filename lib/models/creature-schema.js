'use strict';

const mongoose = require('mongoose');

const schema = mongoose.Schema({
  creature_name: { type: String, required: false },
  latitude: { type: Number, required: true },
  longitude: { type: Number, required: true },
  description: { type: String, required: false },
  explorer: { type: String, required: true },
});

const model = mongoose.model('creatures', schema);

module.exports = model;