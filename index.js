'use strict';

const app = require('./lib/server.js');
const mongodb = process.env.MONGODB_URI;


app.start(process.env.PORT || 3000);