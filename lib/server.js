'use strict';

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');

const generateSwagger = require('../docs/swagger.js');

// ========== MODULES =========
const give404 = require('./middleware/404.js');

// ========== ROUTERS ==========
const categoryRouter = require('./routes/categories.js');
const productRouter = require('./routes/products.js');

// ========== SETUP ==========
let app = express();

generateSwagger(app);

app.use(cors());
app.use(morgan('dev'));

app.use(express.json());

// ========== START SERVER ==========
const startServer = (port, mongodb) => {
  let options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
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
app.use('/api/v1/categories', categoryRouter);


// ========== PRODUCTS ROUTES ==========
app.use('/api/v1/products', productRouter);


// ========== IF NOTHING WORKS ==========
app.use('*', give404);


// ========== EXPORTS ==========
module.exports = {
  server: app,
  start: startServer
}