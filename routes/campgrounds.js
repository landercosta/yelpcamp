const express = require('express');
const router = express.Router();
const Campground = require('../models/campground');

// INDEX - Show all campgrounds
router.get('/', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/index', {campgrounds: allCampgrounds, currentUser: req.user}); 
    }
  });
});

// CREATE - add new campground to db
router.post('/', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const description = req.body.description;
  const newCampground = {name, image, description};

  Campground.create(newCampground, (err, newCampground) => {
    if(err){
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

// NEW - show form to create new campgrounds
router.get('/new', (req, res) =>{
  res.render('campgrounds/new');
});

// SHOW - Show info about one campground
router.get('/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec( (err, foundCampground) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds/show', {campground: foundCampground});
    }
  });
});

module.exports = router;