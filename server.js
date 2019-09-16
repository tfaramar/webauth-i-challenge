const express = require('express');

//assign server as an instance of express
const server = express();

//built-in middleware to parse JSON
server.use(express.json())

module.exports = server;