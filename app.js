const seedDB = require('./seeds');
const express = require('express');
const mongoose = require('mongoose');
const Campground = require('./models/campground');
const Comment = require('./models/comment');
// const Comment = require('./models/user');

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

seedDB();

app.get('/', (req, res) => {
  res.render('landing');
});

// INDEX - Show all campgrounds
app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    } else {
      res.render('index', {campgrounds: allCampgrounds}); 
    }
  });
});

// CREATE - add new campground to db
app.post('/campgrounds', (req, res) => {
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
app.get('/campgrounds/new', (req, res) =>{
  res.render('new');
});

// SHOW - Show info about one campground
app.get('/campgrounds/:id', (req, res) => {
  Campground.findById(req.params.id).populate('comments').exec( (err, foundCampground) => {
    if(err){
      console.log(err);
    } else {
      res.render('show', {campground: foundCampground});
    }
  });
});

app.listen(3000, () => {
  console.log('The YelpCamp server has started.')
});