(function(){

    var express = require('express');
    var app = express();
    var path = require('path');

    //set view engine and path to views
    app.set('view engine', 'jade');
    app.set('views', path.join(__dirname, 'views'));

    //create routes

    app.get('/', function(req, res){

        res.render('layout');

    });

    //export app
    module.exports = app;

})();
