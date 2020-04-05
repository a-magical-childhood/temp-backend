'use strict';

const app = require('./lib/server.js');

app.start(process.env.PORT || 3000);