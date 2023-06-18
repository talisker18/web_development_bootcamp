const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true })); // urlencoded when using form data

app.get("/", function(req, res) {
    //res.send("Hello world!");
    res.sendFile(__dirname+"/index.html"); //__dirname gives current filepath of this file (in this case: calculator.js)
});

app.post("/", function(req, res) {
    //to get the form data from request, we have to install body-parser with npm install body-parser
    var num1 = Number(req.body.num1); //Number is needed because we receive text
    var num2 = Number(req.body.num2);

    var result = num1+num2;

    res.send("result of calculation: " + result);
});

app.get("/bmiCalculator", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmiCalculator", function(req, res) {
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / (height * height);

    res.send("Your BMI is: "+bmi);
});

app.listen(3000, function() {
    console.log('listening on port 3000');
});