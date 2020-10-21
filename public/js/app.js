console.log('CLient side javascript is loaded');
let messageOne = document.querySelector("#message-1")
let messageTwo = document.querySelector("#message-2")
let messageThree = document.querySelector("#message-3");
let messageFour = document.querySelector("#message-4");
let messageFive = document.querySelector("#message-5");

const showWeather = (address) => { 
  fetch(`/weather?address=${address}`)
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      if (response.error) {
        messageOne.textContent = response.error;
        return console.error(response.error)
      }
      const { location, forecast, wind_speed, wind_degree, humidity } = response;
      messageOne.textContent = location;
      messageTwo.textContent = forecast;
      messageThree.textContent = wind_speed;
      messageFour.textContent = wind_degree;
      messageFive.textContent = humidity;
    })
    .catch((error) => {
      console.error(error);
    })
} 

const weatherForm = document.querySelector('form')

const search = document.querySelector('input');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading ...';
  messageTwo.textContent = '';
  messageThree.textContent= "";
  messageFour.textContent = "";
  messageFive.textContent= "";
  showWeather(location);
})