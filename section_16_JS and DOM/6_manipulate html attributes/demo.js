//remember: attributes = class, type, src, href etc

//get all attr
document.querySelector("#someId").attributes; //array of attributes

//get attr
document.querySelector("#someId").getAttribute("href");

//set
document.querySelector("#someId").setAttribute("href", "www.wog.ch");