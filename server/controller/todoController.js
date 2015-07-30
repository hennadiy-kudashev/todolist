var ItemRepository = rootRequire('repository/itemRepository');
var itemRepository = new ItemRepository();
var Item = rootRequire('model/item');

exports.redirect = function (router) {
    router.route('/item')
        .get(function (request, response) {
            var userID = request.cookies.userID;
            itemRepository.getAll(userID, function (error, items) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.json(items);
                }
            });
        })
        .post(function (request, response) {
            var payload = request.body;
            var item = new Item(undefined, payload.title, false);
            var userID = request.cookies.userID;
            itemRepository.create(userID, item, function (error, item) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(201).json(item);
                }
            });
        });
    router.route('/item/:itemID')
        .put(function (request, response) {
            var itemID = request.params.itemID;
            var payload = request.body;
            var item = new Item(itemID, payload.title, payload.isDone);
            itemRepository.update(item, function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(204).end();
                }
            });
        })
        .delete(function (request, response) {
            var itemID = request.params.itemID;
            itemRepository.delete(itemID, function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(204).end();
                }
            });
        });
};
