
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Property = mongoose.model('Property')
  , _ = require('underscore')

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

exports.show = function(req, res, next){
  res.render('properties/show',{
    title: req.property.cname,
    property: req.property
  })
}

exports.new = function(req, res){
  res.render('properties/new',{
    title: 'New Property',
    property: new Property({})
  })
}

exports.edit = function(req, res){
  res.render('properties/edit', {
    title: 'Edit ' + req.property.cname,
    property: req.property
  })
}

exports.update = function(req, res){
  var property = req.property
  property = _.extend(property, req.body)
  property.save(function(err){
    if(err){
      req.flash('error', 'Update Failed')
    }
    res.redirect('/properties')
    
  })

}

exports.destroy = function(req, res){
  // var property = req.property
  // property.remove(function(err){
  //   req.flash('info', 'Deleted successfully')
  //   res.redirect('/properties')
  // })
  res.send(req.property)
}

exports.index = function(req, res){

  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1
  var perPage = 20
  var agent = req.user._id
  var options = {
    perPage: perPage,
    page: page,
    criteria: {
      agent: agent
    }
    
  }

  Property.list(options, function(err, docs){
    if(err){
      res.status(500).send({'status':500})
    } 
    Property.count(options.criteria).exec(function(err, count){
      res.render('properties/index', {
        title: 'properties',
        properties: docs,
        page: page + 1,
        pages: Math.ceil(count / perPage)
      })
    }) 
  })

}