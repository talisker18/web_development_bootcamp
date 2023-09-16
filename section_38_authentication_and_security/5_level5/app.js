require('dotenv').config(); //needed to use env vars. create .env file, put gitignore it
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; //dont push to high with rounds. for example with 31 rounds, your computer needs 2-3days per hash to generate! with 10 rounds, about 10 hashes / sec can be generated

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://0.0.0.0:27017/userDB',  {useNewUrlParser: true});

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.listen(3000, function() {
    console.log("server started on port 3000");
});

app.get("/", function(req, res) {
    res.render("home");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.get("/register", function(req, res) {
    res.render("register");
});

app.post("/register", function(req, res) {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash){
        const newUser = new User({
            email: req.body.username,
            password: hash
        });
    
        newUser.save();
        res.render("secrets");
    });
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    findUser(username).then(
        function(result) {
            if(result) {
                bcrypt.compare(password, result.password, function(err, bcryptRes) {
                    if(bcryptRes === true) {
                        res.render("secrets");
                    }
                });
            } else {
                console.log("not authorised for secrets page");
            }
        },
        function(err) {}
    );
});

async function findUser(username) {
    const user= await User.findOne({email: username});
    return user;
}