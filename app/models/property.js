
/**
 * Module dependencies
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var PropertySchema = new Schema({
  name: { type: String, default : '', trim : true },
  cname: { type: String, default : '', trim : true },
  sname: { type: String, default : '', trim : true },
  address: { type: String, default : '', trim : true },
  floor: { type: String, default : '中層', trim : true },
  price: { type: Number, default : 0, trim : true },
  area: { type: Number, default: 0},
  state: { type: String, default: '', trim: true},
  type: { type: String, default: '', trim: true},
  createdAt: { type: Date, default: Date.now },
  location: { 
    lng: Number,
    lat: Number
  },
  description: { type: String, default: '', trim: true},
  agent: { type: Schema.ObjectId, ref: 'User'}
})

PropertySchema.index({"location": "2d", "createdAt": -1, "name": 1, "type": 1, "state": 1, "price": 1});

/**
  * Validations
  */

PropertySchema.path('price').validate(function(price){
  return price >= 0
}, 'Price cannot less then 0');

// PropertySchema.path('name').validate(function(name){
//   return name.length
// }, 'Name of property cannot be blank');

// PropertySchema.path('address').validate(function(address){
//   return address.length > 0
// }, 'Address of property cannot be blank');

/**
 * Pre-remove hook
 */

 PropertySchema.pre('remove', function(next){
    next();
 });

/**
 * Methods
 */

PropertySchema.methods = {

};

/**
 * Statics
 */

PropertySchema.statics = {

  /* Search by name */
  search: function( query, options, cb){
    var ResultSet = this.find(query)
    ResultSet
      .populate('agent', 'name email phone')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(function(err, docs){
        ResultSet.count(function(err2, count){
          cb(err, docs, count, count > options.perPage*(options.page+1))
        })
      });
  },

  /**
   * Find property by id
   */

  load: function (id, cb) {
    this.findOne({ _id : id })
      .populate('agent', 'name email phone')
      //.populate('comments.user')
      .exec(cb)
  },

  /*
  List properties 
  */
  list: function (options, cb) {
    var criteria = options.criteria || {}
    this.find(criteria)
      .populate('agent', 'name email phone')
      .sort({'createdAt': -1}) // sort by date
      .limit(options.perPage)
      .skip(options.perPage * options.page)
      .exec(cb);
  },

  // Random select near by property
  nearOne: function(point, cb){
    skipNum = Math.floor(Math.random()*100)
    this
      .find({location: {"$near": [point.x, point.y]}})
      .populate('agent', 'name email phone')
      .skip(skipNum)
      .limit(1)
      .exec(cb)
  }
}

mongoose.model('Property', PropertySchema)
