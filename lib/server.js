'use strict';

const express = require('express');
let data = require('../db.json'); 
const give404 = require('./middleware/404.js');
const logger = require('./middleware/logger.js');

let app = express();

app.use(express.json());
app.use(logger);

// ========== Start Server ==========
const startServer = (port) => {
  app.listen(port, () => { console.log( `server is up on port ${port}`)})
};

// ========== HOME ROUTE =========
app.get('/', (req, res) => {
  res.send('<h1>HELLOOOOOOOOO</h1>')
});

// ========== CATEGORIES ROUTES ==========
app.get('/categories', (req, res, next) => {
  console.log('attempting to get categories');
  next();
}, (req, res) => {
  res.send(data.categories);
});

app.post('/categories',  (req, res) => {
  // Add an id to the new item
  let newCategory = req.body;
  newCategory.id = data.categories.length + 1;
  // put it in the db
  data.categories.push(newCategory);

  res.status(201);
  res.send(newCategory);
});

app.put('/categories/:id',  (req, res) => {
  let categoryId = parseInt(req.params.id) - 1;
  let newData = req.body;

  data.categories[categoryId] = {
    ... newData,
    id: categoryId
  };

  res.send(data.categories[categoryId]);
});

app.delete('/categories/:id',  (req, res) => {
  let categoryId = parseInt(req.params.id) - 1;

  data.categories.splice(categoryId);
  res.send(200);
  res.send('successfully deleted!');
});


// ========== PRODUCTS ROUTES ==========
app.get('/products', (req, res, next) => {
  console.log('attempting to get products');
  next();
}, (req, res) => {
  res.send(data.products)
});

app.post('/products',  (req, res) => {

});

app.put('/products/:id',  (req, res) => {

});

app.delete('/products/:id',  (req, res) => {

});

// ========== IF NOTHING WORKS ==========
app.use('*', give404);

// ========== EXPORTS ==========
module.exports = {
  server: app,
  start: startServer
}