var SqlRepository = rootRequire('repository/sqlRepository');
var Item = rootRequire('model/item');

var ItemRepository = function () {

};
ItemRepository.prototype = new SqlRepository();

/**
 * Returns all items.
 * @param resultCallback function(error, Item[] items)
 */
ItemRepository.prototype.getAll = function (resultCallback) {
    this.query('SELECT ID, Title, IsDone FROM dbo.Item;', function (error, resultset) {
        var resultArray = [];
        if (resultset) {
            resultset.forEach(function (item) {
                resultArray.push(new Item(item.ID, item.Title, item.IsDone))
            });
        }
        resultCallback(error, resultArray);
    });
};

/**
 * Adds new Item entry to repository.
 * @param item {Item}
 * @param completeCallback function(error, Item item) which calls when operation is completed.
 */
ItemRepository.prototype.create = function (item, completeCallback) {
    this.queryWithParams(
        'INSERT INTO dbo.Item(Title, IsDone) OUTPUT inserted.* VALUES (@Title, @IsDone);',
        [
            {name: 'Title', value: item.title},
            {name: 'IsDone', value: item.isDone}
        ],
        function (error, resultset) {
            var item  = resultset[0];
            completeCallback(error, new Item(item.ID, item.Title, item.IsDone));
        });
};

module.exports = ItemRepository;