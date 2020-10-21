const express = require('express');
const path = require('path');
const port = process.env.PORT  || 3000;

const hbs = require('hbs');
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');

const app = express();

// Define path for Express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicDir));
hbs.registerPartials(partialsPath);

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Viet Dang'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About me",
    name: "Viet Dang"
  })
})

app.get('/help', (req, res) => {
  res.render('help',{
    title: "Help",
    helpText: 'This is some helpful text',
    name: 'Viet Dang'
  })
})

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'You must provide a weather address'
    })
  }

  geocode(address, (error, response) => {
    if (error) {
      return res.send({
        error
      })
    }
    const { latitude, longitude, location } = response;
    forecast(latitude, longitude, (error, response) => {
      if (error) {
        return res.send({
          error
        })
      }
      const { forecast, wind_speed, wind_degree, humidity } = response;
      res.send({
        address: req.query.address,
        location,
        forecast,
        wind_speed,
        wind_degree,
        humidity,
      })
    })
  })
  // res.send([
  //   { forecast: 'Today the weather looks pretty nice!'},
  //   { location: `I am currently located in ${req.query.address}`}
  // ]);
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(req.query.search);
  res.send({
    products: []
  })
})

app.get('/help/*', (req,res)=> {
  res.render('404', {
    title: '404',
    name: "Viet Dang",
    errorMessage: 'Help article not found'
  });
})

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    name: 'Viet Dang',
    errorMessage: 'Page not found'
  })
})

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
})
