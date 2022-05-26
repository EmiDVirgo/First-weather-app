const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res) {
res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req,res) {
  console.log(req.body.cityName);

  const query = req.body.cityName;
  const unit = "imperial";
  const apiKey = "8f2aefdc5daf4cabfddc570785f579bb";
  const lang = "es";
  const url = ("https://api.openweathermap.org/data/2.5/weather?q="+ query +"&appid="+ apiKey +"&units="+ unit +"&lang="+ lang);

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data){
      const WeatherData = JSON.parse(data);
      const temp = WeatherData.main.temp;
      const feel_like = WeatherData.main.feels_like;
      const description = WeatherData.weather[0].description;
      console.log(description);
      console.log(WeatherData);
      const icon = WeatherData.weather[0].icon;
      const imageUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
      res.write("<p>La temperatura en "+query+" es de " + temp + " grados farenheigth</p>");
      res.write("<h1>La sensacion termica de " + feel_like + " , mientras hoy tenemos " + description + ".</h1>");
      res.write("<img src=" + imageUrl +">" )
      res.send();
    })
  })
})




app.listen(3000, function(){
  console.log("This serever runs on 3000");
});
