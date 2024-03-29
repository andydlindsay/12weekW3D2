const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

const bikes = {
  "1": "Mountain Bike",
  "2": "Pink Bike",
  "3": "Road Bike",
  "4": "Bike-share Bike",
  "5": "Unicycle",
  "6": "Tricycle" 
};

// browse
app.get('/bikes', (request, response) => {
  response.render('bikes', { bikes });
});

// add
app.get('/bikes/new', (request, response) => {
  response.render('new-bike');
});

app.post('/bikes', (request, response) => {
  const { newBike } = request.body;
  const newId = Object.keys(bikes).length + 1;
  bikes[newId] = newBike;
  response.redirect('/bikes');
});

// read
app.get('/bikes/:id', (request, response) => {
  response.render('bike', { bike: bikes[request.params.id], id: request.params.id });
});

const edit = (request, response) => {
  const newBikeName = request.body.bikeName;
  const id = request.params.id;
  bikes[id] = newBikeName;
  response.redirect(`/bikes/${id}`);
};

// edit
app.post('/bikes/:id', edit);

// delete
app.post('/bikes/:id/delete', (request, response) => {
  delete bikes[request.params.id];
  response.redirect('/bikes');
});

// catchall route
app.get('*', (request, response) => {
  response.redirect('/bikes');
});

// app to listen
app.listen(3000, () => {
  console.log('app is listening on port 3000');
});
