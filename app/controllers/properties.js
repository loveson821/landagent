
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Property = mongoose.model('Property')

// New property

exports.new = function(req, res){
  res.send('ok');
}
