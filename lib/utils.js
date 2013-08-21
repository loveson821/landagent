var _ = require('underscore')

/**
 * Formats mongoose errors into proper array
 *
 * @param {Array} errors
 * @return {Array}
 * @api public
 */

exports.errors = function (errors) {
  var keys = Object.keys(errors)
  var errs = []

  // if there is no validation error, just display a generic error
  if (!keys) {
    console.log(errors);
    return ['Oops! There was an error']
  }

  keys.forEach(function (key) {
    errs.push(errors[key].type)
  })

  return errs
}

// Pass in req.param
exports.paramEncap = function( param, op ){
  var res = {}
  if( param ){
    if( _.isArray(param) ){
      res[op] = param
      return res
    }
    else
      return param 
  }
}