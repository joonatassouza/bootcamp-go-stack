const express = require('express');
const server = express();

let requests = 0;

server.use(express.json());

server.use(countRequests);

server.use(require('./routes'));

server.listen('3000');

function countRequests(req, res, next) {
  console.log(++requests);

  return next();
}
