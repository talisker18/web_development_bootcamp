console.log("hello world");

//add the module 'filesystem' (fs) with keyword 'require'. fs is an internal node module
const fs = require("fs");

//copy a file (source / destination)
fs.copyFileSync("file1.txt", "file2.txt");

const superhero = require("superheroes");
var name = superhero.random();
console.log(name);