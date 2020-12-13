'use strict';

const creatureSchema = require('../models/creature-schema.js');

const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
  console.log(`found model ${req.params.model}`);
  
  switch(req.params.model){
  case 'creature':
    req.colModel = new Model(creatureSchema);
    break;
  default:
    res.status(404);
    res.end();
    return;
  }

  next();
};

module.exports = modelFinder;