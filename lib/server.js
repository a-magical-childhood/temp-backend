'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const generateSwagger = require('../docs/swagger.js');
// let data = require('../db.json');

// ========== MODULES =========
const give404 = require('./middleware/404.js');
const logger = require('./middleware/logger.js');
let getTime = require('./middleware/timestamp.js');

// ========== ROUTERS ==========
const categoryRouter = require('./routes/categories.js');
const productRouter = require('./routes/products.js');

// ========== SETUP ==========
let app = express();

generateSwagger(app);

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());
// app.use(getTime);
// app.use(logger);

// ========== START SERVER ==========
const startServer = (port, mongodb) => {
  let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  };

  mongoose.connect(mongodb, options);
  app.listen(port, () => { console.log( `server is up on port ${port}`)});
};

// ========== HOME ROUTE =========
/**
 * This route gives you a standard home page
 * @route GET /
 * @produces text/html
 * @returns {object} 200 - HTML tags with a welcome message
 */
app.get('/', (req, res) => {
  res.send('<h1>HELLOOOOOOOOO</h1>')
});

// ========== CATEGORIES ROUTES ==========
/**
 * This route gives you a list of all categories
 * @route GET /categories
 * @group categories
 * @returns {object} 200 - An array of category objects
 */
app.get('/categories', (req, res, next) => {
  console.log('attempting to get categories');
  next();
}, (req, res) => {
  res.send(data.categories);
});

/**
 * This route creates a new category
 * @route POST /categories
 * @group categories
 * @returns {object} 201 - The new category object
 */
app.post('/categories', (req, res) => {
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
app.put('/categories/:id', (req, res) => {
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
app.delete('/categories/:id', (req, res) => {
  let categoryId = parseInt(req.params.id) - 1;

  data.categories.splice(categoryId);
  res.status(200);
  res.send('<h3>successfully deleted!</h3>');
});


// ========== PRODUCTS ROUTES ==========
/**
 * This route gives you a list of all products
 * @route GET /products
 * @group products
 * @returns {object} 200 - An array of products objects
 */
app.get('/products', (req, res, next) => {
  console.log('attempting to get products');
  next();
}, (req, res) => {
  res.send(data.products)
});

/**
 * This route creates a new product
 * @route POST /products
 * @group products
 * @returns {object} 201 - The new product object
 */
app.post('/products', (req, res) => {
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
app.put('/products/:id', (req, res) => {
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
app.delete('/products/:id', (req, res) => {
  let productId = parseInt(req.params.id) - 1;

  data.products.splice(productId);
  res.status(200);
  res.send('successfully deleted!');
});

// ========== IF NOTHING WORKS ==========
app.use('*', give404);

// ========== EXPORTS ==========
module.exports = {
  server: app,
  start: startServer
}