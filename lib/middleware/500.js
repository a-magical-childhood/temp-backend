'use strict';

const give500 = (req, res) => {
  res.status(500)
  res.send('<h1>Hi there! We\'re sorry, but something went wrong on our side. (ERROR 500).</h1>');
}

module.exports = give500;