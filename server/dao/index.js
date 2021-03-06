//TODO implement Data Access Layer
const mongoose = require('mongoose');
const Author = require('../models/Author');
const Book = require('../models/Book');
const authorCollection = require('../initial/authors');
const bookCollection = require('../initial/books');

/**
 * Data Access Layer
 *
 * @constructor
 * @param {Object} config - database config
 */
function DAO(config) {
    //TODO init database
    mongoose.Promise = global.Promise;
    mongoose.connect(config, {useNewUrlParser: true})
        .then(() => console.log('DB CONNECTED!'))
        .catch(e => {
            console.log('ERROR! DB Connection Failed!');
            console.log(e)
        })
}

/**
 * Create database instance and load init data
 * @param {Object} data - init database data
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.init = function (data, callback) {
    //TODO create instance and load data
    this.clear((err, db) => {
        if (err) {
            console.log(`ERROR! Error clear!`);
            console.error(err);
        } else console.log(`Database cleanup completed successfully!`);
        try {
            Author.collection.insertMany(authorCollection);
            Book.collection.insertMany(bookCollection);
            console.log("Multiple documents inserted to Collection!");
        } catch (err) {
            console.log('ERROR! Error insert!');
            return console.error(err);
        }
    });
    callback && callback();
};

/**
 * Clear database
 * @param {Function} callback - two params err, callback result
 * @returns {void}
 */
DAO.prototype.clear = function (callback) {
    //TODO clear database
    Author.collection.deleteMany();
    Book.collection.deleteMany();
    callback && callback();
};

module.exports = DAO;