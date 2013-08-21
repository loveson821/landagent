/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Property = mongoose.model('Property')
  , utils = require('../../../lib/utils')

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
      //res.status(500).send({'status':500})
      res.status(500).send({
        'success': false,
        'error': 'cannot create, db Failed'
      })
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

exports.search = function(req, res){
  var word = req.param('word') || ''
  var query = {}
  
  req.param('word') && ( query.name = { $regex: new RegExp( req.param('word'), 'i') } )
  req.param('type') && ( query.type = utils.paramEncap( req.param('type'), '$in') )
  req.param('state') && ( query.state = utils.paramEncap( req.param('state'), '$in') )
  req.param('floor') && ( query.floor = utils.paramEncap( req.param('floor'), '$in') )
  
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
  var count = req.param('count') > 0 ? req.param('count') : 10

  var options = {
    perPage: count,
    page: page
  }

  Property.search(query, options, function(err, docs, count, next){
    if(err){
      res.send({
        'success': false, 'error': err
      })
    }
    else{
      res.send({count: count, next: next, docs: docs})
    }
  })
}