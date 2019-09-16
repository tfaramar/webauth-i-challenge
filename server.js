const express = require('express');

//assign server as an instance of express
const server = express();
const UsersRouter = require('./users/users-router.js');

//built-in middleware to parse JSON
server.use(express.json());

//user routes
server.use('/api', UsersRouter);

module.exports = server;