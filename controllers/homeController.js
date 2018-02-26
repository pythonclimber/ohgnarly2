var User = require('../models/server.user');
var Message = require('../models/server.message');
var Category = require('../models/server.category');
var UserContact = require('../models/server.userContact');
var Movie = require('../models/server.movie');

module.exports.login = function(req, res) {
    let username = req.body.userName.toLowerCase();
    User.findOne({userName: username}, (err, user) => {
        if (err) {
            console.error(err);
            return res.send({success: false, userId: null});
        }
            
        if (user && user.password == req.body.password) {
            res.send({success: true, userId: user._id});
        } else {
            res.send({success: false, userId: null});
        }
    });
};

module.exports.createUser = function(req, res) {
    var movie = new Movie({
        title: 'Se7en',
        description: 'Mystery/Suspense',
        userId: '58cb3e444c8d5f6b7cdd71f6',
        director: 'David Fincher'
    });

    movie.save();

    res.send({success: true, movie: movie});
};

module.exports.getMessages = function(req, res) {
    Message.find({createdAt: {$gt: new Date(Date.now() - (24 * 60 * 60 * 1000))}}).exec((err, messages) => {
        if (err) {
            return console.error(err);
        }

        res.send(messages);
    });
};

module.exports.createMessage = function(req, res) {
    let message = new Message({messageBody: req.body.messageBody, userId: req.body.userId});
    message.save();
    res.redirect('/messages');
};

module.exports.getUsers = function(req, res) {
    User.find().exec((err, users) => {
        if (err) {
            return console.error(err);
        }

        res.send(users);
    });
};

module.exports.getCategories = function(req, res) {
    Category.find().exec((err, categories) => {
        if (err) {
            return console.error(err);
        }

        res.send(categories);
    });
};

module.exports.getContacts = function(req, res) {
    UserContact.find({userId: req.params.userId}).exec((err, contacts) => {
        User.find({_id: {"$in": contacts.map(e => e.contactId)}}).exec((err, users) => {
            if (err) {
                return console.error(err);
            }

            res.send(users);
        });
    });
};

module.exports.getMovies = (req, res) => {
    Movie.find({userId: req.params.userId}).exec((err, movies) => {
        if (err) {
            return console.error(err);
        }

        res.send(movies);
    });
};

module.exports.createMovie = (req, res) => {
    var movie = new Movie({title: req.body.title, description: req.body.description, userId: req.body.userId, director: req.body.director});
    movie.save();
    res.send(movie);
};

module.exports.setFavorite = (req, res) => {
    Movie.findOne({_id: req.params.id}, (err, movie) => {
        
    })
};