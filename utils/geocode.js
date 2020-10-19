const request = require('postman-request');

// Mapbox access key
// pk.eyJ1IjoidmlldGRhbmciLCJhIjoiY2tnYjFjbmR3MGNtYjJzcHFyN2dzbmQ1byJ9.0_FNGfQeNeLE21jtQ8Njjg

const geocode = (address, callback) => {
  const mapboxUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidmlldGRhbmciLCJhIjoiY2tnYjFjbmR3MGNtYjJzcHFyN2dzbmQ1byJ9.0_FNGfQeNeLE21jtQ8Njjg&limit=1`

  request({url: mapboxUrl, json: true}, (error, response) => {
    if (error) {
      callback('Unable to connect to the location services', undefined);
    } else if (!response.body.features || response.body.features.length === 0) {
      callback('Unable to find location. Try another place', undefined);
    } else {
      const { place_name: location, center } = response.body.features[0]
      const [longitude, latitude] = center;
      callback(undefined, {latitude, longitude, location});
    }
  })
}

// geocode('Philly', (error, data) => {
//   console.log('Error', error);
//   console.log('Data', data);
// });

module.exports = geocode;