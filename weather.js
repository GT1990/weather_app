// Require https (need for proccess.argv)
const https = require("https");
// Require http
const http = require("http");
// Require api
const api = require("./api.json");

function printError(message) {
  console.error(message);
}

function get(query) {
  try {
    const numbersRegEx = /^\d+$/;
    let api_url = "";
    if (query.match(numbersRegEx)) {
      // zip code
      api_url = `https://api.openweathermap.org/data/2.5/weather?zip=${query}&units=imperial&appid=${api.key}`;
    } else {
      // city name
      api_url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=imperial&appid=${api.key}`;
    }
    const request = https.get(api_url, (response) => {
      if (response.statusCode === 200) {
        let body = "";
        response.on("data", (data) => {
          body += data.toString();
        });
        response.on("end", () => {
          body = JSON.parse(body);
          const weatherMessage = `The weather in ${body.name} is ${body.main.temp} degrees fahrenheit`;
          console.log(weatherMessage);
        });
      } else {
        printError(
          `Status Code Error: ${response.statusCode} ${
            http.STATUS_CODES[response.statusCode]
          }`
        );
      }
    });
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
