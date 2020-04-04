'use strict';

let express = require('express');

let app = express();

// ========== Start Server ==========
const startServer = (port) => {
  app.listen(port, () => { console.log( `server is up on port ${port}`)})
};

// ========== Home Route ==========
app.get('/', (req, res) => {
  res.send('<h1>HELLOOOOOOOOO</h1>')
})


module.exports = {
  server: app,
  start: startServer
}