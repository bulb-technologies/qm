var express = require('express');
var favicon = require('serve-favicon');
var path = require('path');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//var auth = require('./config/auth');
//var session = require('./config/session');
var lib = require('./lib');
var app = express();

//set locals
app.locals.title = 'Qwik Motlakase';

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

//add session
//app.use(session);

//passwordless middleware aliased: auth
//app.use(auth.sessionSupport());
//app.use(auth.acceptToken({ successRedirect: '/allocator'}));

//add static middleware
app.use(express.static(path.join(__dirname, 'bower_components')));
//app.use(express.static(path.join(__dirname, 'semantic/dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(lib);

// catch 404 and forward to error handler
app.use(function(req, res, next) {

  var err = new Error('Not Found');
  err.status = 404;
  next(err);

});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

  app.use(function(err, req, res, next) {

      console.log(err); //TODO: remove this

    res.status(err.status || 500);

        if(err.statusType){

            res.json({

                status: err.statusType, // fail
                data: {

                    message: err.message // If the reasons for failure correspond to POST values, the response object's keys SHOULD correspond to those POST values.

                }

            });

        }else{

            res.json({

                status: 'error',
                message: err.message

            });

        }

  });

}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
