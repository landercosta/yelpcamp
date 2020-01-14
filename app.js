const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.urlencoded({extended: true}));
app.set('view engine', 'ejs');

// SCHEMA SETUP
const campgroundSchema = new mongoose.Schema({
  name: String,
  image: String
});

const Campground = mongoose.model('Campground', campgroundSchema);



app.get('/', (req, res) => {
  res.render('landing');
});

app.get('/campgrounds', (req, res) => {
  Campground.find({}, (err, allCampgrounds) => {
    if(err){
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds: allCampgrounds}); 
    }
  });
});

app.post('/campgrounds', (req, res) => {
  const name = req.body.name;
  const image = req.body.image;
  const newCampground = {name, image};

  Campground.create(newCampground, (err, newCampground) => {
    if(err){
      console.log(err);
    } else {
      // console.log('Newly created campground:');
      // console.log(newCampground);
      res.redirect('/campgrounds');
    }
  });
});

app.get('/campgrounds/new', (req, res) =>{
  res.render('new');
});

app.listen(3000, () => {
  console.log('The YelpCamp server has started.')
});