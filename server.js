var express = require('express');
var app = express();


// configure app to use bodyParser(). This will let us get the data from a POST
var bodyParser = require('body-parser');
app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({	extended: true})); //for parsing application/x-www-form-urlencoded

var rest = require('./rest/rest');
rest.register(app);

app.use(express.static('public'));
app.get('/', function (request, response) {
	response.sendfile('public/index.html');
});

var port = process.env.PORT || 3000;
app.listen(port);