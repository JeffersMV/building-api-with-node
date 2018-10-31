'use strict';
const Book = require('../models/Book');

/**
 * Send specific book entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */

function getBooks(req, res) {
    Book.find().then(book => {
        res.json({
            confirmation: 'success',
            data: book
        });
    }).catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        });
    });
}

function getBookById(req, res) {
    //TODO implement
    let id = req.params.id;
    Book.findById(id)
        .then(book => {
            res.json({
                confirmation: 'success',
                data: book
            });
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: 'Error! Book with the ' + id + ' no exist'
            });
        });
}

function updateBook(req, res) {
    let name = req.body.name;
    if (name != null) {
        let id = req.params.id;
        Book.findOneAndUpdate({_id: id}, req.body, {new: true})
            .then(book => {
                res.json({
                    confirmation: 'success',
                    data: book
                })
            })
            .catch(err => {
                res.json({
                    confirmation: 'fail',
                    message: 'Error! Book with the ' + id + ' no exist'
                });
            });
    } else {
        res.json({
            confirmation: 'fail',
            message: 'Error! Book name is empty'
        });
    }
}

function createBook(req, res) {
    let name = req.body.name;
    if (name != null) {
        let newBook = new Book(req.body);
        newBook.save()
            .then(book => {
                res.json({
                    confirmation: 'success',
                    data: book
                })
            })
            .catch(err => {
                res.json({
                    confirmation: 'fail',
                    message: err.message
                });
            });
    } else res.json({
        confirmation: 'fail',
        message: 'Error! Author name is empty'
    });
}

function removeBook(req, res) {
    const id = req.params.id;
    Book.findOneAndDelete({_id: id})
        .then(() => {
            res.json({
                confirmation: 'success',
                message: 'Task successfully deleted'
            })
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: err.message
            });
        });
}

//TODO add other methods
exports.getBooks = getBooks;
exports.getBookById = getBookById;
exports.updateBook = updateBook;
exports.createBook = createBook;
exports.removeBook = removeBook;
