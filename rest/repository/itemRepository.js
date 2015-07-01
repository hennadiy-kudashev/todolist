var ItemRepository = function() {

};

var Item = require('./../model/item');

ItemRepository.prototype.getAll = function() {
	return [
		new Item(1, 'Create a to-do list1', true),
		new Item(2, 'Take down Christmas tree', false),
		new Item(3, 'Learn Ember.js', false),
		new Item(4, 'Binge watch every episode of MacGyver', false),
		new Item(5, 'Alphabetize everything in the fridge', false),
		new Item(6, 'Do 10 pull-ups without dropping', false),
	];
};

module.exports = ItemRepository;