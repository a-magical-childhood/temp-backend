'use strict';

const express = require('express');
const router = express.Router();

const creatureSchema = require('../models/creature-schema.js');
const Model = require('../models/model.js');

const CreatureModel = new Model(creatureSchema);

/**
 * This route gives you a list of all creature
 * @route GET /creature
 * @group creature
 * @returns {object} 200 - An array of creature objects
 */
router.get('/', (req, res, next) => {
  console.log('attempting to get creature');
  next();
}, async (req, res) => {
  let results = await CreatureModel.readByQuery({});
  res.send(results);
});

/**
 * This route creates a new creature
 * @route POST /creature
 * @group creature
 * @returns {object} 201 - The new creature object
 */
router.post('/', async (req, res) => {
  let newCreature = await CreatureModel.create(req.body);

  res.status(201);
  res.send(newCreature);
});

/**
 * This route updates a creature
 * @route PUT /creature/:id
 * @group creature
 * @param {number} id.params.required - id of the field you want to update 
 * @returns {object} 200 - The updated creature object
 */
router.put('/:id', async (req, res) => {
  let updatedRecord = await CreatureModel.update(req.params.id, req.body);

  res.status(200);
  res.send(updatedRecord);
});

/**
 * This route deletes a creature
 * @route DELETE /creature/:id
 * @group creature
 * @param {number} id.params.required - id of the field you want to delete
 * @returns {object} 200 - HTML tags with a success message
 */
router.delete('/:id', async (req, res) => {
  await CreatureModel.delete(req.params.id);

  res.status(200);
  res.send(`<h3>successfully deleted creature ${req.params.id}</h3>`);
});

module.exports = router;