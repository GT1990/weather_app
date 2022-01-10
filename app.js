const weather = require("./weather");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  "Type in a U.S. city name or zipcode to get the weather: ",
  (res) => {
    readline.close();
    weather.get(res);
  }
);
