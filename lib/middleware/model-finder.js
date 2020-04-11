'use strict';

const categoriesSchema = require('../models/categories-schema.js');
const productsSchema = require('../models/products-schema.js');

const Model = require('../models/model.js');

const modelFinder = (req, res, next) => {
  console.log(`found model ${req.params.model}`)
  
  switch(req.params.model){
    case 'products':
      req.colModel = new Model(productsSchema);
      break;
    case 'categories':
      req.colModel = new Model(categoriesSchema);
      break;
    default:
      res.status(404);
      res.end();
      return;
  }

  next();
}

module.exports = modelFinder;