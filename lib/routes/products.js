'use strict';

const express = require('express');
const router = express.Router();

const productsSchema = require('../models/products-schema.js');
const Model = require('../models/model.js');

const ProductsModel = new Model(productsSchema);

/**
 * This route gives you a list of all products
 * @route GET /products
 * @group products
 * @returns {object} 200 - An array of products objects
 */
router.get('/', (req, res, next) => {
  console.log('attempting to get products');
  next();
}, async (req, res) => {
  let results = await ProductsModel.readByQuery({});
  res.send(results);
});

/**
 * This route creates a new product
 * @route POST /products
 * @group products
 * @returns {object} 201 - The new product object
 */
router.post('/', (req, res) => {
  // Add an id to the new item
  let newProduct = req.body;
  newProduct.id = data.products.length + 1;
  // put it in the db
  data.products.push(newProduct);

  res.status(201);
  res.send(newProduct);
});

/**
 * This route updates a product
 * @route PUT /products/:id
 * @group products
 * @param {number} id.params.required - id of the field you want to update 
 * @returns {object} 200 - The updated product object
 */
router.put('/:id', (req, res) => {
  let productId = parseInt(req.params.id) - 1;
  let newData = req.body;

  data.products[productId] = {
    ... newData,
    id: productId + 1
  };

  res.send(data.products[productId]);
});

/**
 * This route deletes a product
 * @route DELETE /products/:id
 * @group products
 * @param {number} id.params.required - id of the field you want to delete
 * @returns {object} 200 - HTML tags with a success message
 */
router.delete('/:id', (req, res) => {
  let productId = parseInt(req.params.id) - 1;

  data.products.splice(productId);
  res.status(200);
  res.send('successfully deleted!');
});

module.exports = router;