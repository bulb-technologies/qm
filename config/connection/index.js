(function(){
    
    var mongoose = require('mongoose');
    var db = mongoose.createConnection(process.env.DB_URL);
    module.exports = db;
    
})();
