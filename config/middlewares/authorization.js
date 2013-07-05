
/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = function (req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

/*
 *  User authorization routing middleware
 */

exports.user = {
  hasAuthorization : function (req, res, next) {
    if (req.profile.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/users/'+req.profile.id)
    }
    next()
  }
}

/*
 *  Article authorization routing middleware
 */

exports.article = {
  hasAuthorization : function (req, res, next) {
    if (req.article.user.id != req.user.id) {
      req.flash('info', 'You are not authorized')
      return res.redirect('/articles/'+req.article.id)
    }
    next()
  }
}

/*
 *  Property authorization routing middleware
 */

 exports.property = {
  hasAuthorization: function(req, res, next){
    if( req.property.agent.id != req.user._id){
      req.flash('info', 'You are not authorized')
      return res.redirect('/properties')
    }
    next()
  }
 }