var SqlRepository = rootRequire('repository/sqlRepository');
var Item = rootRequire('model/item');

var ItemRepository = function () {

};
ItemRepository.prototype = new SqlRepository();

/**
 * Returns all items.
 * @param userID user identifier
 * @param resultCallback function(error, Item[] items)
 */
ItemRepository.prototype.getAll = function (userID, resultCallback) {
    this.queryWithParams(
        'SELECT ID, Title, IsDone FROM dbo.Item WHERE UserID = @UserID;',
        [
            {name: 'UserID', value: userID}
        ],
        function (error, resultset) {
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
 * @param userID user identifier
 * @param item {Item}
 * @param completeCallback function(error, Item item) which calls when operation is completed.
 */
ItemRepository.prototype.create = function (userID, item, completeCallback) {
    this.queryWithParams(
        'INSERT INTO dbo.Item(Title, IsDone, UserID) OUTPUT inserted.* VALUES (@Title, @IsDone, @UserID);',
        [
            {name: 'Title', value: item.title},
            {name: 'IsDone', value: item.isDone},
            {name: 'UserID', value: userID}
        ],
        function (error, resultset) {
            var item = resultset[0];
            completeCallback(error, new Item(item.ID, item.Title, item.IsDone));
        });
};

/**
 * Updates existing Item entry in repository.
 * @param item {Item}
 * @param completeCallback function(error) which calls when operation is completed.
 */
ItemRepository.prototype.update = function (item, completeCallback) {
    this.queryWithParams(
        'UPDATE dbo.Item SET Title = @Title, IsDone = @IsDone WHERE ID = @ID;',
        [
            {name: 'ID', value: item.id},
            {name: 'Title', value: item.title},
            {name: 'IsDone', value: item.isDone}
        ],
        function (error, resultset) {
            completeCallback(error);
        });
};

/**
 * Deletes existing Item entry from repository.
 * @param itemID
 * @param completeCallback function(error) which calls when operation is completed.
 */
ItemRepository.prototype.delete = function (itemID, completeCallback) {
    this.queryWithParams(
        'DELETE FROM dbo.Item WHERE ID = @ID;',
        [
            {name: 'ID', value: itemID}
        ],
        function (error, resultset) {
            completeCallback(error);
        });
};

module.exports = ItemRepository;