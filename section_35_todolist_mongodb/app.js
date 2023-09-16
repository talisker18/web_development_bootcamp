//routes: '/', '/work'

const express = require('express');
const bodyParser = require('body-parser');
const dateModule = require(__dirname + '/date.js'); //add .js when requiring own modules
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const _ = require('lodash');

const app = express();
app.set('view engine', 'ejs'); //use ejs template engine. This assumes a views directory containing an XX.ejs page.
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//create db
//0.0.0.0 needed instead of localhost for this mongo version
mongoose.connect('mongodb://0.0.0.0:27017/todolistDB',  {useNewUrlParser: true}); //create database todolistDB if not exists

//create mongo schema
const itemsSchema = new mongoose.Schema({
    name: String
});
//create mongo model
const Item = mongoose.model("Item", itemsSchema);

//create some default items and put them in DB
const item1 = new Item({
    name: "Welcome to your todo list"
});

const item2 = new Item({
    name: "Item2"
});

const item3 = new Item({
    name: "Item3"
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema ({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

/*try {
    Item.insertMany(defaultItems);
 } catch (e) {
    print (e);
 }*/

 //start server
app.listen(3000, function() {
    console.log("listening on port 3000...");
});

//methods
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
    //The .then() method should be called on the promise object to handle a result (resolve) or an error (reject). 
    myItems().then(
        function(result){ //call this function when the Promise resolves. param 'result' = 'items' returned by the the promise's (=myItems) resolve function
            res.render('list', {listTitle: "Today", itemList: result}); //render list.ejs inside views folder; as the key of the JSON object, use the key used in list.ejs
        },
        function(error){ //call this function when the Promise rejects
            console.log(error);
        }
    );
});

app.get("/:customListName", function(req, res) {
    const customListName = _.capitalize(req.params.customListName);

    findList(customListName).then(
        function(result){
            if(!result) {
                console.log("doesnt exist");
                console.log("print default items: " + defaultItems);
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
            
                list.save();
                res.redirect("/" + customListName);
            } else {
                console.log("does already exist");
                res.render("list", {listTitle: customListName, itemList: result.items});
            }
        },
        function(error){
            console.log(error);
        }
    );
})

app.post("/", function(req, res) {

    let itemName = req.body.newItem; //get this by name from list.ejs; the object contains the value property
    let listName = req.body.list; //get the value property of the button with name="list"

    /*if(req.body.list === "Worklist") { //list = button element, found by its name 'list'. get the dynamic value of this button element (will be Worklist if the post request came from /work)
        workItems.push(item);
        res.redirect('/work');
    } else {
        items.push(item);
        res.redirect('/');
    }*/

    const item = new Item({
        name: itemName,
    });

    if(listName === "Today") {
        item.save();
    res.redirect('/');
    } else {
        findList(listName).then(
            function(result){
                result.items.push(item);
                result.save();
                res.redirect('/' + listName);
            },
            function(error){
                console.log(error);
            }
        );
    }
});

app.post("/delete", function(req, res) {
    const checkedItem = req.body.checkbox; //was sent by value of the input of type 'checkbox'

    const listName = req.body.listName;

    if(listName === "Today") {
        try {
            Item.deleteOne({_id: new mongodb.ObjectID(checkedItem._id)}); //delete is not working...
         } catch (e) {
            console.log(e);
         }
    
        console.log("checked item to delete: "+checkedItem);
    
        res.redirect('/');
    } else { //custom list
        findList(listName).then(
            function(result){
                //using mongoose findOneAndUpdate method...but not working...
                List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItem._id}}}, function(err, foundList) {
                    if(!err) {
                        res.redirect('/' + listName);
                    }
                });
            },
            function(error){
                console.log(error);
            }
        );;
    }
});

app.get("/about", function(req, res) {
    res.render('about');
});


//find all items method; returns a Promise object because its async
async function myItems() {
    const items= await Item.find({}); //wait here until all items are loaded

    return items; //return: new Promise(function(resolve, reject) {resolve(items);});
}

async function findList(customListName) {
    const list = await List.findOne({name: customListName});
    return list;
}