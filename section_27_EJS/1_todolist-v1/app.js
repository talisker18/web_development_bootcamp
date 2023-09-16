//routes: '/', '/work'

const express = require('express');
const bodyParser = require('body-parser');
const dateModule = require(__dirname + '/date.js'); //add .js when requiring own modules

const app = express();
app.set('view engine', 'ejs'); //use ejs template engine. This assumes a views directory containing an XX.ejs page.
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var items = ["Buy food", "Cook food", "Eat food"];
var workItems = [];

app.listen(3000, function() {
    console.log("listening on port 3000...");
});

app.get("/", function(req, res) {

    //we can export this logic to an own node_module

    /*var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);*/

    //run an exported function of date.js
    var day = dateModule.getDate();

    res.render('list', {listTitle: day, itemList: items}); //render list.ejs inside views folder; as the key of the JSON object, use the key used in list.ejs
});

app.post("/", function(req, res) {

    let item = req.body.newItem; //get this by name from list.ejs

    if(req.body.list === "Worklist") { //list = button element, found by its name 'list'. get the dynamic value of this button element (will be Worklist if the post request came from /work)
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }
});

app.get("/work", function(req, res) {
    res.render("list", {listTitle: "Worklist", itemList: workItems});
});

app.post("/work", function(req, res) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/work');
});

app.get("/about", function(req, res) {
    res.render('about');
});