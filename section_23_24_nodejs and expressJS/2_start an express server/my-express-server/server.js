//'npm install -g nodemon' to install a tools that restarts the server automatically when changes are detected
//to start the server, use 'nodemon server.js' instead of 'node server.js'

const express = require('express');
const app = express();
app.get('/', function(request, response) { //handles requests to localhost:3000/
    console.log(request);
    response.send("<h1>Hello world!</h1>");
});

//listen on port 3000
app.listen(3000, function () {
    console.log('listening on port 3000');
});