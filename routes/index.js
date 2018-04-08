var express = require('express');
var router = express.Router();
var Bird = require('../models/bird');

/* GET home page. */
router.get('/', function(req, res, next) {

    // Query to fetch all documents, just get the name and sort by name
    Bird.find().select({name: 1, description: 1} ). sort({name: 1})
        .then( (birdDocs) => {
            console.log('All birds', birdDocs);
            res.render('index', {title: 'All Birds', birds: birdDocs})
        }).catch( (err) => {
            next(err);
    })

});

/* POST create new bird document */
router.post('/addBird', function (req, res, next) {

  // Use form data in req.body to create new bird
    var bird = Bird(req.body);

    // Save the bird object to DB as new Bird document
    bird.save().then((birdDoc) => {
      console.log(birdDoc);
      res.redirect('/');
    }).catch((err) => {
      next(err);
    });

});

router.get('/bird/:_id', function(req, res, next){
    // Get _id of bird from req.params
    // Query the DB to get this birds document
    Bird.findOne({ _id: req.params._id})
        .then((birdDoc) => {
            if (birdDoc){       //If a bird with this id was found
                console.log(birdDoc);
                res.render('birdinfo', {title: birdDoc.name, bird: birdDoc});
            } else {
                var err = Error('Bird not found');
                err.statur = 404;
                throw err;
            }
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
