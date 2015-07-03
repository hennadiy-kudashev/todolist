var ItemRepository = rootRequire('rest/repository/itemRepository');
var itemRepository = new ItemRepository();

exports.redirect = function (router) {
    router.route('/todo')
        .get(function (request, response) {
            itemRepository.getAll(function (error, items) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.json(items);
                }
            });
        })
        .post(function (request, response) {
            var payload = request.body;
            var Item = rootRequire('rest/model/item');
            var item = new Item(undefined, payload.title, false);

            itemRepository.create(item, function (error) {
                if (error) {
                    response.status(500).send(error);
                } else {
                    response.status(204).end();
                }
            });
        });
};
