'use strict';
const Author = require('../models/Author');

/**
 * Send specific author entity by id
 * @param {Object} req - HTTP request object
 * @param {Object} res - HTTP response object
 * @returns {void}
 */

function getAuthors(req, res) {
    Author.find().then(authors => {
        res.json({
            confirmation: 'success',
            data: authors
        });
    }).catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        });
    });
}

function getAuthorById(req, res) {
    //TODO implement
    let id = req.params.id;
    Author.findById(id)
        .then(author => {
            res.json({
                confirmation: 'success',
                data: author
            });
        })
        .catch(err => {
            res.json({
                confirmation: 'fail',
                message: 'Error! Author with the ' + id + ' no exist'
            });
        });
}

function updateAuthor(req, res) {
    let query = req.query;
    let email = req.body.email;
    if (email != null) {
        let id = req.params.id;
        Author.findOneAndUpdate({_id: id}, query, {new: true})
            .then(author => {
                res.json({
                    confirmation: 'success',
                    data: author
                })
            })
            .catch(err => {
                res.json({
                    confirmation: 'fail',
                    message: 'Error! Author with the ' + id + ' no exist'
                });
            });
    } else res.json({
        confirmation: 'fail',
        message: 'Error! Author email is empty'
    });
}

function createAuthor(req, res) {
    let email = req.body.email;
    if (email != null) {
        let newAuthor = new Author(req.body);
        newAuthor.save()
            .then(author => {
                res.json({
                    confirmation: 'success',
                    data: author
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
        message: 'Error! Author email is empty'
    });
}

function removeAuthor(req, res) {
    const id = req.params.id;
    Author.findOneAndDelete({_id: id})
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
exports.getAuthors = getAuthors;
exports.getAuthorById = getAuthorById;
exports.updateAuthor = updateAuthor;
exports.createAuthor = createAuthor;
exports.removeAuthor = removeAuthor;