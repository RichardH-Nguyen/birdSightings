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

    bird.nest = {
        location: req.body.nestLocation,
        materials: req.body.nestMaterials
    };

    // Save the bird object to DB as new Bird document
    bird.save().then((birdDoc) => {
      console.log(birdDoc);
      res.redirect('/');
    }).catch((err) => {
      if(err.name === 'ValidationError'){
          req.flash('error', err.message);
          res.redirect('/');
      }
      else {
          next(err);
      }
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

router.post('/addSighting', function (req, res, next){

    Bird.findOneAndUpdate({_id: req.body._id },
        { $push: { datesSeen: {$each: [req.body.date], $sort: -1 } } },
        {runValidators: true})
        .then((updatedBirdDoc) => {
            if(updatedBirdDoc){
                res.redirect(`/bird/${req.body._id}`);
            }
            else {
                var err = Error("Adding sighting error, bird not found");
                err.status = 404;
                throw err;
            }
        })
        .catch((err) => {
            if (err.name === 'CastError'){
                req.flash('error', 'Date must be in valid format');
                res.redirect(`/bird/${req.body._id}`);
            }
            else if (err.name === 'ValidationError'){
                req.flash('error', err.message);
                res.redirect(`/bird/${req.body._id}`)
            }
            else{
                next(err);
            }
        });

});

router.post('/deleteBird', function(req, res, next){
    Bird.findByIdAndRemove(req.body._id)
        .then((deletedBird) => {
            if(deletedBird){
                req.flash('info', `${req.body.name} has been deleted.`);
                res.redirect('/');
            }
        })
        .catch((err) => {
            next(err);
        })
});

router.post('/updateBird', function(req, res, next){
    Bird.update({_id:req.body._id},
        {
            description: req.body.description,
            averageEggs: req.body.averageEggs,
            height: req.body.height,
            nest:{location: req.body.nestLocation,
                materials: req.body.nestMaterials
            }
        }, {runValidators: true})
        .then((updatedBirdDoc) => {
            if(updatedBirdDoc){
                req.flash('info', `${req.body.name} has been updated.`);
                res.redirect(`/bird/${req.body._id}`);
            }
        })
        .catch((err) => {
            next(err);
        })
});

module.exports = router;
