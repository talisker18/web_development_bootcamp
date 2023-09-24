import emoji from "./emojipedia.js";

var numbers = [3, 56, 2, 48, 5];

//Map -Create a new array by doing something with each item in an array.

function double(x) {
    return x*2;
}

const newNumbers = numbers.map((num) => double(num)); //its like the stream method of Java
console.log("mapped: "+newNumbers);

//same
const newNumbers2 = numbers.map((num) => num * 2);


//Filter - Create a new array by keeping the items that return true.
const filteredNumbers = numbers.filter((num) => num > 10);
console.log("filtered: "+filteredNumbers);

//Reduce - Accumulate a value by doing something to each item in an array.
var result = 0;
const reducedNumbers = numbers.reduce((previousValue, currentValue) => previousValue + currentValue); //sum up all values for example
console.log("reduced (summed up all values): "+reducedNumbers);

//Find - find the first item that matches from an array.
var foundNumber = numbers.find((num) => num > 10); //get only the first occurrence
console.log("foundNumber: "+foundNumber);

//FindIndex - find the index of the first item that matches.
var foundIndex = numbers.findIndex((num) => num > 10); //get only the first occurrence
console.log("foundIndex: "+foundIndex);



//////challenge//////
//get the first 10 chars from each emoji description
const result2 = emoji.map((entry) => entry.meaning.substring(0, 10));
console.log(result2);
