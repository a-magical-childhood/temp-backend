'use strict';

const getTime = (req, res, next) => {
  let time = new Date();
  req.requestTime = time;

  next();
}

module.exports = getTime;