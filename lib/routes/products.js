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
router.post('/', async (req, res) => {
  let newProduct = await ProductsModel.create(req.body);

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
router.put('/:id', async (req, res) => {
  let updatedRecord = await ProductsModel.update(req.params.id, req.body);

  res.status(200);
  res.send(updatedRecord)
});

/**
 * This route deletes a product
 * @route DELETE /products/:id
 * @group products
 * @param {number} id.params.required - id of the field you want to delete
 * @returns {object} 200 - HTML tags with a success message
 */
router.delete('/:id', async (req, res) => {
  let deletedRecord = await ProductsModel.delete(req.params.id);

  res.status(200);
  res.send(`<h3>successfully deleted product ${req.params.id}</h3>`);
});

module.exports = router;