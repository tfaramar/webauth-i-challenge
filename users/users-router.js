const express = require('express');

//import bcrypt.js hashing library
const bcrypt = require('bcryptjs');

const Users = require('./users-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('API working!');
});

router.get('/users', (req, res) => {
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
                res.status(401).json({ message: 'Invalid Credentials' });
              }
        })
        .catch(error => {
            res.status(500).json(error);
        });
});

module.exports = router;