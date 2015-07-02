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

var route = require('./rest/approute');
route.register(app);

app.listen(port);