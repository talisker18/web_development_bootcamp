require('dotenv').config(); //needed to use env vars. create .env file, put gitignore it
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose"); //used to salt and hash
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const findOrCreate = require("mongoose-findorcreate"); //see line with User.findOrCreate

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
    //these fields will be saved in the database
    email: String,
    password: String,
    googleId: String, //this attribute is needed when using google to authenticate.
    secret: String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("User", userSchema);

passport.use(User.createStrategy());
passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, {
        id: user.id,
        username: user.username,
        picture: user.picture
      });
    });
  });
  
passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
        return cb(null, user);
    });
});

passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets", //from the app of the created google app
    userProfileURL: "https://www.googleapis.com/oauth2/v3/userinfo" //google + api will be deprecated, so add this to still work
  },
  function(accessToken, refreshToken, profile, cb) { //this is called after successful authentication
    User.findOrCreate({ googleId: profile.id }, function (err, user) { //the findOrCreate method is pseudo code, replace it with mongoose logic. for this we use package mongoose-findorcreate which implements exactly this method
      return cb(err, user);
    });
  }
));

app.listen(3000, function() {
    console.log("server started on port 3000");
});

app.get("/", function(req, res) {
    res.render("home");
});

//init auth with google
app.get('/auth/google', //this is called when we hit the google button (while login or registering)
  passport.authenticate('google', { scope: ['profile'] }));

//this request is done by google. it tries to call our defined redirect URI, in this case '/auth/google/secrets'
app.get('/auth/google/secrets', passport.authenticate('google', { failureRedirect: '/login' }), function(req, res) {
    // Successful authentication (local authentication, building then a session), redirect to secrets.
    res.redirect('/secrets');
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

app.get("/submit", function(req, res) {
    if(req.isAuthenticated()) {
        res.render("submit");
    } else {
        res.redirect("/login");
    }
});

app.post("/submit", function(req, res) {
    const submittedSecret = req.body.secret;

    User.findById(req.user.id, function(err, foundUser) {
        if(err) {
            console.log(err);
        } else {
            if(foundUser) {
                foundUser.secret = submittedSecret;
                foundUser.save(function() {
                    res.redirect("/secrets");
                });
            }
        }
    });
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