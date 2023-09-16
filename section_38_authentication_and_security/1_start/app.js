const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

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
    const newUser = new User({
        email: req.body.username,
        password: req.body.password
    });

    newUser.save();
    res.render("secrets");
});

app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;
    findUser(username, password).then(
        function(result) {
            if(result) {
                res.render("secrets");
            } else {
                console.log("not authorised for secrets page");
            }
        },
        function(err) {}
    );
});

async function findUser(username, password) {
    const user= await User.findOne({email: username, password:password});
    return user;
}