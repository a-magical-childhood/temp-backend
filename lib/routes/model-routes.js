'use strict';

const express = require('express');
const router = express.Router();

const modelFinder = require('../middleware/model-finder.js');

router.param('model', modelFinder);


router.get('/:model', async (req, res, next) => {
  let results = await req.colModel.readByQuery({});
  res.send(results);
});


router.get('/:model/:id', async (req, res, next) => {
  let result = await req.colModel.read(req.params.id);
  res.status(200);
  res.send(result);
})


router.post('/:model', async (req, res, next) => {
  let result = await req.colModel.create(req.body);

  res.status(201);
  res.send(result);
});


router.put('/:model/:id', async (req, res) => {
  let updatedRecord = await req.colModel.update(req.params.id, req.body);

  res.status(200);
  res.send(updatedRecord)
});


router.delete('/:model/:id', async (req, res) => {
  let deletedRecord = await req.colModel.delete(req.params.id);

  res.status(200);
  res.send(`<h3>successfully deleted category ${req.params.id}</h3>`);
});

module.exports = router;