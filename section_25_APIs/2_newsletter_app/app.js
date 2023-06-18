const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const https = require('https');

const app = express();
app.use(express.static("public")); //needed for the server to get the custom CSS.
app.use(bodyParser.urlencoded({ extended: true }));

//for localhost we use port 3000
/*app.listen(3000, function() {
    console.log("server running on port 3000");
});*/

//dynamic port defined by Heroku || app will run on port 3000 on localhost
app.listen(process.env.PORT || 3000, function() {
    console.log("server running on port 3000");
});

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {

    console.log();
    const firstName = req.body.firstName; //get it by name attribute
    const lastName = req.body.lastName; 
    const email = req.body.email;

    const data = { //see mailchimp reference for the request body params
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const mailChimpBaseUrl = "https://us21.api.mailchimp.com/3.0/"; //us21 = server -> see the end of your API key
    const mailChimpListPath = "lists/f04b91341b"; //using our audience id

    //see 'option's of 'https module' of method 'request': https://nodejs.org/api/http.html#httprequestoptions-callback
    const options = {
        method: "POST",
        auth: "joel1:2a4aa45d528e0bd2bba101d564d1dff7-us21" //mailchimp allows any username + API key as pw for basic auth
    };

    const request = https.request(mailChimpBaseUrl+mailChimpListPath, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html");
        } else {
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function(data){
            console.log(JSON.parse(data));
        });
    });

    //send the request to mailchimp
    request.write(jsonData);
    request.end();

    //if request was successful, we will see new contact in our mailchimp audience
});

//mail chimp API Key: 2a4aa45d528e0bd2bba101d564d1dff7-us21

//mailchim audience id: f04b91341b

app.post("/failure", function(req, res) {
    res.redirect("/");
});