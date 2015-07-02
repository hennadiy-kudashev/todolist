var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

var rest = require('./rest/rest');
rest.register(app);

app.use(express.static('public'));
app.get('/', function (request, response) {
	response.sendfile('public/index.html');
});

app.listen(port);