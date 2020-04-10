'use strict';

const express = require('express');
const router = express.Router();

const categoriesSchema = require('../models/categories-schema.js');
const Model = require('../models/model.js');

const CategoriesModel = new Model(categoriesSchema);

/**
 * This route gives you a list of all categories
 * @route GET /categories
 * @group categories
 * @returns {object} 200 - An array of category objects
 */
router.get('/', (req, res, next) => {
  console.log('attempting to get categories');
  next();
}, async (req, res) => {
  let results = await CategoriesModel.readByQuery({});
  res.send(results);
});

/**
 * This route creates a new category
 * @route POST /categories
 * @group categories
 * @returns {object} 201 - The new category object
 */
router.post('/', (req, res) => {
  // Add an id to the new item
  let newCategory = req.body;
  newCategory.id = data.categories.length + 1;
  // put it in the db
  data.categories.push(newCategory);

  res.status(201);
  res.send(newCategory);
});

/**
 * This route updates a category
 * @route PUT /categories/:id
 * @group categories
 * @param {number} id.params.required - id of the field you want to update 
 * @returns {object} 200 - The updated category object
 */
router.put('/:id', (req, res) => {
  let categoryId = parseInt(req.params.id) - 1;
  let newData = req.body;

  data.categories[categoryId] = {
    ... newData,
    id: categoryId + 1
  };

  res.status(200);
  res.send(data.categories[categoryId]);
});

/**
 * This route deletes a category
 * @route DELETE /categories/:id
 * @group categories
 * @param {number} id.params.required - id of the field you want to delete
 * @returns {object} 200 - HTML tags with a success message
 */
router.delete('/:id', (req, res) => {
  let categoryId = parseInt(req.params.id) - 1;

  data.categories.splice(categoryId);
  res.status(200);
  res.send('<h3>successfully deleted!</h3>');
});

module.exports = router;
