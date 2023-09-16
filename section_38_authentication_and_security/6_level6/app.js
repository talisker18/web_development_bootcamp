require('dotenv').config(); //needed to use env vars. create .env file, put gitignore it
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); //used to salt and hash

const app = express();

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: "our little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect('mongodb://0.0.0.0:27017/userDB',  {useNewUrlParser: true});
mongoose.set("useCreateIndex", true);

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser()); //store user info into cookie
passport.deserializeUser(User.deserializeUser()); //read user info from cookie

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

app.get("/secrets", function(req, res) {
    if(req.isAuthenticated()) {
        res.render("secrets");
    } else {
        res.redirect("/login");
    }
});

app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
});

app.post("/register", function(req, res) {
    //register method from passportLocalMongoose
    User.register({username: req.body.username}, req.body.password, function(err, user) {
        if(err) {
            console.log("error when registering user");
            res.redirect("/register");
        } else {
            //strange syntax ...
            /*passport.authenticate("local")(req, res, function(){
                res.redirect("/secrets");
            });*/

            passport.authenticate("local", function(req, res) {
                res.redirect("/secrets");
            });
        }
    });
});

app.post("/login", function(req, res) {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    //login method from passportLocalMongoose
    req.login(user, function(err) {
        if(err) {
            console.log(err);
        } else {
            passport.authenticate("local", function(req, res) {
                res.redirect("/secrets");
            });
        }
    });
});

async function findUser(username) {
    const user= await User.findOne({email: username});
    return user;
}