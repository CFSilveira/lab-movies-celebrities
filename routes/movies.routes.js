// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const { populate } = require("../models/Celebrity.model");
const Celebrity = require('../models/Celebrity.model');
const Movie = require('../models/Movie.model');


// all your routes here

router.get("/movies/create", (req, res) => {
    Celebrity.find()
    .then((dbCelebs) => {
    res.render('movies/new-movie', { dbCelebs });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));

}) 

router.post('/movies/create', (req, res, next) => {
    const { title, genre , plot, cast } = req.body;

    Movie.create({ title, genre , plot, cast })
      .then((allMovies) => {
        console.log('Created movie', allMovies.title);
        res.redirect('/movies');
      })
      .catch((err) => next(err));
  
});

router.get('/movies', (req, res) => {
    Movie.find()
        .then((dbMovies) => {
        res.render('movies/movies', { dbMovies });
        })
        .catch((err) => console.log(`Err while displaying post input page: ${err}`));
});

router.get('/movies/:id', (req, res, next) => {
    const { id } = req.params;

    Celebrity.find()
    .then((dbCelebs) => {
    res.render('movies/movie-details', { dbCelebs });
    })

    Movie.findById(id)
    .populate('cast')
        .then((foundMovie) => {
        console.log(foundMovie);
        res.render('movies/movie-details', foundMovie);
        })
        .catch((err) => next(err));
});


module.exports = router;