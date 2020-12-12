'use strict';

const productsSchema = require('../models/products-schema.js');

const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
  console.log(`found model ${req.params.model}`);
  
  switch(req.params.model){
  case 'products':
    req.colModel = new Model(productsSchema);
    break;
  default:
    res.status(404);
    res.end();
    return;
  }

  next();
};

module.exports = modelFinder;