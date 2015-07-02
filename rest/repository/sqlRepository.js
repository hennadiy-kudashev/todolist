var sql = require('mssql'); 

var config = {
    user: '...',
    password: '...',
    server: 'localhost', // You can use 'localhost\\instance' to connect to named instance
    database: '...'    
}

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
}

module.exports = SqlRepository;