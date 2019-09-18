const express = require('express');
//import express-session
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const dbConnection = require('./data/db-config.js');

const UsersRouter = require('./users/users-router.js');

//assign server as an instance of express
const server = express();

//session config object
const sessionConfig = {
    name: 'oatmeal', //non-default name
    secret: 'avena', //encryption/decryption key
    cookie: {
        maxAge: 1000 * 60, //cookie valid for one minute
        secure: false, //change to true for production
        httpOnly: true, //cannot be accessed by JS
    },
    resave: false, //don't recreate if cookie is unchanged
    saveUninitialized: false, //GDPR
    store: new KnexSessionStore({
        knex: dbConnection,
        tablename: 'knexsessions',
        createtable: true,
        clearInterval: 1000 * 60 * 30,
    }),
};

//built-in middleware to parse JSON
server.use(express.json());
server.use(session(sessionConfig));

//user routes
server.use('/api', UsersRouter);

module.exports = server;