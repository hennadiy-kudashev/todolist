var express = require('express');
var app = express();


// configure app to use bodyParser(). This will let us get the data from a POST
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

app.use(bodyParser.json()); //for parsing application/json
app.use(bodyParser.urlencoded({extended: true})); //for parsing application/x-www-form-urlencoded
app.use(cookieParser());

global.rootRequire = function (name) {
    return require(__dirname + '/server/' + name);
};

app.use(express.static('client'));
app.get('/', function (request, response) {
    response.sendfile('client/index.html');
});

rootRequire('rest').register(app);

var port = process.env.PORT || 3000;
app.listen(port);