const request = require('postman-request');


const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=d83af1c9e4672dee63cb5edb955ba9ab&query=${lat},${lng}`;
  request({url, json: true}, (error, response) => {
    // console.log(response.body.current);
    if (error) {
      callback(error, undefined);
    } else if (!response.body.current) {
      callback('Cannot find location', undefined)
    } else {
      const { current } = response.body;
      const { temperature, feelslike, weather_descriptions, wind_speed, wind_degree, humidity } = current;
      callback(undefined, 
         { 
          forecast: `${weather_descriptions} The current temperature is ${temperature}, but it feels likes ${feelslike}`, 
          wind_speed: `The current wind speed is ${wind_speed} mile/hour`,
          wind_degree: `The current wind degree is ${wind_degree} F`,
          humidity: `The current humidity is ${humidity}%`
         });
    }
  })
}

module.exports = forecast;