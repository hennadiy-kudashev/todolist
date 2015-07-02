var sql = require('mssql'); 

var config = {
    user: '1gb_banzaj-ra',
    password: 'bfee2e68',
    server: 'mssql3.1gb.ua',
    database: '1gb_todo'
};

var SqlRepository = function(){

};

SqlRepository.prototype.query = function(query, resultCallback){
	sql.connect(config, function(err) {
	    var request = new sql.Request();
	    request.query(query, function(err, recordset) {
	        console.log(recordset);
	        resultCallback(recordset);
	    });
	});	
};

module.exports = SqlRepository;