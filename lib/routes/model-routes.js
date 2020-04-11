'use strict';

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder.js');

router.param('model', modelFinder);

/**
 * This route gives you a list of all models
 * @route GET /:model
 * @returns {object} 200 - An array of model objects
 */
router.get('/:model', async (req, res, next) => {
  let results = await req.colModel.readByQuery({});
  res.send(results);
});

/**
 * This route gives you a single matching model
 * @route GET /:model/:id
 * @returns {object} 200 - A matching model objects
 */
router.get('/:model/:id', async (req, res, next) => {
  let result = await req.colModel.read(req.params.id);
  res.status(200);
  res.send(result);
})

/**
 * This route creates a new model
 * @route POST /:model
 * @returns {object} 201 - The new model object
 */
router.post('/:model', async (req, res, next) => {
  let result = await req.colModel.create(req.body);

  res.status(201);
  res.send(result);
});

/**
 * This route updates a model
 * @route PUT /:model/:id
 * @param {number} id.params.required - id of the model field you want to update 
 * @returns {object} 200 - The updated model object
 */
router.put('/:model/:id', async (req, res) => {
  let updatedRecord = await req.colModel.update(req.params.id, req.body);

  res.status(200);
  res.send(updatedRecord)
});

/**
 * This route deletes a model
 * @route DELETE /:model/:id
 * @param {number} id.params.required - id of the model field you want to delete
 * @returns {object} 200 - HTML tags with a success message
 */
router.delete('/:model/:id', async (req, res) => {
  let deletedRecord = await req.colModel.delete(req.params.id);

  res.status(200);
  res.send(`<h3>successfully deleted category ${req.params.id}</h3>`);
});

module.exports = router;