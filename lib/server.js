'use strict';

let express = require('express');

let app = express();

const startServer = (port) => {
  app.listen(port, () => { console.log( `server is up on port ${port}`)})
}

module.exports = {
  server: app,
  start: startServer
}