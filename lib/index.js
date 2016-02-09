(function(){

    var express = require('express');
    var router = express.Router();

    //use middleware
    router.use(require('./hooks'));
    router.use(require('./web/anonymous'));
    router.use(require('./web/administrator'));

    //export router
    module.exports =  router;

})();
