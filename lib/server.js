'use strict';

let express = require('express');
let db = require('../db.json'); 

let app = express();

// ========== Start Server ==========
const startServer = (port) => {
  app.listen(port, () => { console.log( `server is up on port ${port}`)})
};

// ========== HOME ROUTE =========
app.get('/', (req, res) => {
  res.send('<h1>HELLOOOOOOOOO</h1>')
});

// ========== CATEGORIES ROUTES ==========
app.get('/categories', (req, res) => {

});

app.post('/catgories',  (req, res) => {

});

app.put('/categories/:id',  (req, res) => {

});

app.delete('/categories/:id',  (req, res) => {

});


// ========== PRODUCTS ROUTES ==========
app.get('/products', (req, res) => {

});

app.post('/products',  (req, res) => {

});

app.put('/products/:id',  (req, res) => {

});

app.delete('/products/:id',  (req, res) => {

});

// ========== EXPORTS ==========
module.exports = {
  server: app,
  start: startServer
}