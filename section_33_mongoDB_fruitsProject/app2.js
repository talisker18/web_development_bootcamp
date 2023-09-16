
/**
 * using mongoose
 * 
 * 
 */

const mongoose = require('mongoose');
//0.0.0.0 needed instead of localhost for this mongo version
mongoose.connect('mongodb://0.0.0.0:27017/fruitsDB',  {useNewUrlParser: true}); //create database fruitsDB if not exists

//fruits ------------------------
const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true, "Please check data enty, no name was specified"]
    },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
    name: "Apple",
    rating: 7,
    review: "good"
});

fruit.save();

const pineapple = new Fruit({
    name: "Pineapple",
    rating: 9,
    review: "very good"
});

pineapple.save();


//persons --------------------
const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favouriteFruit: fruitSchema //establish relationship between Person and Fruit
});

const Person = mongoose.model("Person", personSchema);

const person = new Person({
    name: "Joel",
    age: 35,
    favouriteFruit: pineapple
});

person.save();



//insert multiple fruits
const kiwi = new Fruit({
    name: "Kiwi",
    rating: 10,
    review: "the best fruit"
});

const orange = new Fruit({
    name: "Orange",
    rating: 9,
    review: "very good"
});

try {
    Fruit.insertMany([kiwi, orange]);
 } catch (e) {
    print (e);
 }

//find docs
myfruits();



//update
//_id = id given by mongoose for an document. or use any other filter, like {name: "XY"}; second param is the field we want to update, in this case name
try {
    Fruit.updateOne({_id: "5bc0854dd6ec7ad010738bc7"}, {name: "Peach"});
 } catch (e) {
    print(e);
 }

//delete
try {
    Fruit.deleteOne({name: "Peach"});
 } catch (e) {
    print (e);
 }

async function myfruits() {
    const fruits= await Fruit.find({});
    fruits.forEach(function(fruit){
        console.log(fruit.name);
    });
}