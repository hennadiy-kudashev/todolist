var express = require('express');
var router = express.Router();

var ItemRepository = require('./repository/itemRepository');
var itemRepository = new ItemRepository();

exports.register = function (app) {
    router.route('/todo')
        .get(function (request, response) {
            var items = itemRepository.getAll();
            response.json(items);
        });
    app.use('/api', router);

    app.use(express.static('public'));
    app.get('/', function (request, response) {
        response.sendfile('public/index.html');
    });
};