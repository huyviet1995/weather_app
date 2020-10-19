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
      const { temperature, feelslike, weather_descriptions } = current;
      callback(undefined, `${weather_descriptions} The current temperature is ${temperature}, but it feels likes ${feelslike}`);
    }
  })
}

module.exports = forecast;