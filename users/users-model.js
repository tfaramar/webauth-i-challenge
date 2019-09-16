const db = require('../data/db-config.js');

module.exports = {
    find,
    add,
    findBy,
    findById
};

function find() {
    return db('users')
        .select(
            'id',
            'username',
            'password'
        );
};

function add(user) {
    return db('users')
        .insert(user, 'id')
        .then((user) => {
            return user;
        })
};

function findBy(filter) {
    return db('users')
        .where(filter);
};

function findById(id) {
    return db('users')
        .where({ id })
        .first();
};