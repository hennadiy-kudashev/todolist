var express = require('express');
var router = express.Router();

var ItemRepository = require('./repository/itemRepository');
var itemRepository = new ItemRepository();


exports.register = function (app) {
    //restricted to use application/json content type only.
    app.use(function(req, res, next) {
        var ALLOWED_CONTENT_TYPE = 'application/json';
        if (!req.headers['content-type'] && req.headers['content-type'] !== ALLOWED_CONTENT_TYPE) {
            return res.status(406).end();
        }
        res.contentType(ALLOWED_CONTENT_TYPE);
        next();
    });

    router.route('/todo')
        .get(function (request, response) {
            itemRepository.getAll(function(error, items){
                if (error){
                    response.status(500).send(error);
                }else {
                    response.json(items);
                }
            });
        })
        .post(function (request, response) {
            var payload = request.body;
            var Item = require('./model/item');
            var item = new Item(undefined, payload.title, false);

            itemRepository.create(item, function(error){
                if (error){
                    response.status(500).send(error);
                }else {
                    response.status(204).end();
                }
            });
        });
    app.use('/api', router);
};