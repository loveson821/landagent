/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Property = mongoose.model('Property')

// Find property by id
exports.property = function(req, res, next, id) {
  Property
    .load( id,
      function (err, doc) {
        if (err) return next(err)
        if (!doc) return next(new Error('Failed to load User ' + id))
        req.property = doc
        next()
      })
}

exports.show = function(req, res){
  res.send(req.property);
}

exports.create = function(req, res){
  var property = new Property(req.body)
  property.agent = req.user
  property.save(function(err, doc){
    if(!err){
      res.send(doc)
    }else{
      res.status(500).send({'status':500})
    }
  })  
}

exports.index = function(req, res){
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
  var perPage = 30
  var options = {
    perPage: perPage,
    page: page
  }

  Property.list(options, function(err, docs){
    if(err){
      res.status(500).send({'status':500})
    } 
    res.send(docs);
  })

}

exports.shake = function(req, res){
  lat = req.param.lat || 22
  lng = req.param.lng || 113
  Property.nearOne({x: lat, y: lng},function(err, doc){
    if(err) res.status(500).send({'status':500})
    res.send(doc)
  })
}