module.exports = function(app, passport) {
  // users api
  var users = require('./controllers/users')
  app.get('/api', function(req, res){res.send({"status": 'working'})})

  //properties api
  var properties = require('./controllers/properties')
  app.get('/api/properties', properties.index)
  app.get('/api/property/:proid', properties.show)
  app.get('/api/property/shake/:lat/:lng', properties.shake)

  app.param('proid', properties.property)
}