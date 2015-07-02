var express = require('express');
var router = express.Router();

var ItemRepository = require('./repository/itemRepository');
var itemRepository = new ItemRepository();

exports.register = function(app) {
	router.route('/todo')
		.get(function(request, response) {
			response.sendfile('index.html');
		});
	app.use('/api', router);
	app.use('/api', express.static('public'));
};