var express = require('express');
var router = express.Router();
var homeCtrl = require('../controllers/homeController');


router.post('/login', (req, res) => {
    homeCtrl.login(req, res);
});

router.get('/messages', (req, res) => {
    homeCtrl.getMessages(req, res);
});

router.post('/message', (req, res) => {
    homeCtrl.createMessage(req, res);
});

router.get('/users', (req, res) => {
    homeCtrl.getUsers(req, res);
});

router.get('/categories', (req, res) => {
    homeCtrl.getCategories(req, res);
});

router.get('/new-message', (req, res) => {
    req.body.body = 'Sup, dude';
    req.body.userId = '58cb3e444c8d5f6b7cdd71f6';
    homeCtrl.createMessage(req, res);
});

router.get('/new-movie', (req, res) => {
    homeCtrl.createUser(req, res);
})

router.get('/contacts/:userId', (req, res) => {
    homeCtrl.getContacts(req, res);
});

router.get('/movies/:userId', (req, res) => {
    homeCtrl.getMovies(req, res);
});

router.post('/movies/set-favorite/:id', (req, res) => {
    homeCtrl.setFavorite(req, res);
});

router.post('/movie', (req, res) => {
    homeCtrl.createMovie(req, res);
});


module.exports = router;