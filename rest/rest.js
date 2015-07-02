var express = require('express');
var router = express.Router();

var ItemRepository = require('./repository/itemRepository');
var itemRepository = new ItemRepository();

exports.register = function (app) {
    router.route('/todo')
        .get(function (request, response) {
            itemRepository.getAll(function(items){
                response.json(items);
            });
        });
    app.use('/api', router);
};