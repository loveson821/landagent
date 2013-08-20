var faker = require('./faker.js');
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

User = mongoose.model('User')
Property = mongoose.model('Property')

// Drop collections first
// mongoose.connection.collections['users'].drop( function(err) {
//     console.log('users dropped');
// });


// for(var i = 0; i < 1000; i++){
//   user = new User();
//   user.name = faker.firstname();
//   user.email = faker.email();
//   user.username = user.name + ' ' + faker.lastname();
//   user.password = '123';
//   user.phone = '62462436';
//   user.save(function(err, doc){
//     if(err) throw err;
//     console.log(doc.email);
//   });
// }

states = ['出租','出售','租或售']
types = ['住宅','店舖','車位','辦公室']
floors = ['低層','中層','高層']
Property.find({}).exec(function(err, docs){
  docs.forEach(function(elem, index, array){
    User.random(function(err, user){
      elem.agent = user;
      elem.area = Math.floor(Math.random()*1500) + 300;
      elem.name = elem.cname || elem.sname;
      elem.price = Math.floor(Math.random()*200) + 300;
      elem.type = types[Math.floor(Math.random()*3)];
      elem.floor = floors[Math.floor(Math.random()*3)];
      elem.state = states[Math.floor(Math.random()*4)];
      elem.createdAt = Date.now();
      elem.save(function(err, d){
        if (err) throw err;
        console.log(d.id);
      });
    });
    
  });
});

