'use strict';

const logger = (req, res, next) => {
  let time = new Date();
  console.log(`request made to ${req.method} ${req.url} at ${time}`);

  next();
}

module.exports = logger;