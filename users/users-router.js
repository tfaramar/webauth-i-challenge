const express = require('express');

//import bcrypt.js hashing library
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API working!');
});

router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(error => res.send(error));       
});

router.post('/register', (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;
    Users.add(user)
        .then(saved => {
            res.status(201).json(saved);
        })
        .catch(error => {
            res.status(500).json(error);
        });    
});

router.post('/login', (req, res) => {
    let {username, password} = req.body;
    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                res.status(200).json({ message: `Welcome ${user.username}!` });
              } else {
                res.status(401).json({ message: 'You shall not pass!' });
              }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

//custom middleware
function restricted (req, res, next) {
    const { username, password } = req.headers;
    if (username && password) {
      //if username/pass exist, check username, then use compareSync to verify password
      Users.findBy({ username })
      .first()
      .then(user => {
        if (user && bcrypt.compareSync(password, user.password)) {
          next();
        } else {
          res.status(401).json({ message: "You shall not pass!" })
        }
      })
    } else {
      res.status(400).json({ message: "Please provide a username and password." })
    }
  }

module.exports = router;