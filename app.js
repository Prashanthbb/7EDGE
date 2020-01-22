var express = require('express');
var bodyParser = require('body-parser');
// initialize our express app
var app = express();
var path = require('path');


var main = require('./routes/main.routes');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(main);

let port = 8080;

app.listen(port, () => {
    console.log('Server is up and running on port number ' + port);
});
