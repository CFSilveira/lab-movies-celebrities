// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();

const Celebrity = require('../models/Celebrity.model');

// all your routes here
router.get("/celebrities/create", (req, res) => res.render("celebrities/new-celebrity"));

router.post('/celebrities/create', (req, res, next) => {
    const { name, occupation, catchPhrase} = req.body;
  
    Celebrity.create({ name, occupation, catchPhrase })
      .then((allCelebrities) => {
        console.log('Created celebrity', allCelebrities.name);
        res.redirect('/celebrities');
      })
      .catch((err) => next(err));
  
});

/* router.get("/celebrities", (req, res) => res.render("celebrities/celebrities")); */


router.get('/celebrities', (req, res) => {
Celebrity.find()
    .then((dbCelebs) => {
    res.render('celebrities/celebrities', { dbCelebs });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));
});

module.exports = router;