var sql = require('mssql'); 

var config = {
    user: '1gb_banzaj-ra',
    password: 'bfee2e68',
    server: 'mssql3.1gb.ua',
    database: '1gb_todo'
};

var SqlRepository = function(){

};

/**
 * Makes sql query without input parameters.
 *
 * @param query sql query
 * @param resultCallback function(error, recordset)
 */
SqlRepository.prototype.query = function(query, resultCallback){
	this.queryWithParams(query, undefined, resultCallback);
};

/**
 * Makes sql query with input parameters [{name: '', value: ''}].
 *
 * @param query sql query
 * @param params [{name: '', value: ''}]
 * @param resultCallback function(error, recordset)
 */
SqlRepository.prototype.queryWithParams = function(query, params, resultCallback){
	sql.connect(config, function(err) {
		if (err){
			resultCallback(err);
			return;
		}
		var request = new sql.Request();
		if (params) {
			params.forEach(function (param) {
				request.input(param.name, param.value);
			});
		}
		request.query(query, function(err, recordset) {
			if (err){
				resultCallback(err, recordset);
				return;
			}
			console.log(recordset);
			resultCallback(undefined, recordset);
		});
	});
};

module.exports = SqlRepository;