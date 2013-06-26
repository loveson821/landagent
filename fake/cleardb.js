var env = process.env.NODE_ENV || 'development'
  , config = require('../config/config')[env]
  , auth = require('../config/middlewares/authorization')
  , mongoose = require('mongoose')
  , fs = require('fs')

// Bootstrap db connection
mongoose.connect(config.db)

// Bootstrap models
var models_path = __dirname + '/../app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

mongoose.connection.collections['users'].drop( function(err) {
    console.log('users dropped');
});

