const express = require('express');
const app = express(); //start app with 'nodemon app.js'
const https = require("https"); //native node module, we do not need to install this
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

//for post requests we have to install body-parser
app.post("/", function(req, res){
    const query = req.body.cityName; //extract values of form by using body-parser
    const apiKey = "11ece9499855602a1a975e29832e7d45";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"";
    https.get(url, function(resFromWeatherApi) {
        console.log(resFromWeatherApi.statusCode);
        resFromWeatherApi.on("data", function(data) {
            const weatherData = JSON.parse(data);
            console.log(weatherData);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description; //access an array of a JSON response
            const icon = weatherData.weather[0].icon;
            const imageUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(temp);
            res.write("<h1>The temperature in "+query+" is: " + temp+"</h1>");
            res.write("<p>The weather is currently " + weatherDescription+"</p>");
            res.write("<img src='"+imageUrl+"'>");
            res.send(); //as soon as we use send, we jump out of the request. So we can only use 'send' once
        });
    });
    //res.send("server is up and runnning"); //see comment above
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});