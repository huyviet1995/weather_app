console.log('CLient side javascript is loaded');
let messageOne = document.querySelector("#message-1")
let messageTwo = document.querySelector("#message-2")

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
      console.log(response);
      messageOne.textContent = response.location;
      messageTwo.textContent = response.forecast;
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
  showWeather(location);
})