var vine = {}
  , superagent = require('superagent')



// Hold the users current logged status
vine.loggedIn = false



// Hold the users current session
vine.session = null



// Hold the users information
vine.user = null



// Hold the latest response for users timeline
vine.timeline = null



// Hold the latest response for popular request
vine.popular = null



// Hold the latest response for promoted request
vine.promoted = null



// Hold the latest response for a user search request
vine.userSearchResults = null



// Hold the latest response for a users notifications
vine.notifications = null



// Hold the latest response for a tag search request
vine.tags = null



// Hold the latest response for a likes search request
vine.userLikeResults = null



// Hold the latest response for a twitter following request
vine.userFollowing = null



// List of URLs I have found
vine.urls = {
  loginUrl: 'https://api.vineapp.com/users/authenticate'
  , logoutUrl: 'https://api.vineapp.com/users/authenticate'
  , userUrl: 'https://api.vineapp.com/users/me'
  , popular: 'https://api.vineapp.com/timelines/popular'
  , timeline: 'https://api.vineapp.com/timelines/users/'
  , tag: 'https://api.vineapp.com/timelines/tags/'
  , notifications: 'https://api.vineapp.com/users/'
  , promoted: 'https://api.vineapp.com/timelines/promoted'
  , userSearch: 'https://api.vineapp.com/users/search/'
  , userLikes: 'https://api.vineapp.com/timelines/users/'
  , userFollowing: 'https://api.vineapp.com/users/'
}



vine.login = function (options, fn) {

  var username = options.username || undefined
    , password = options.password || undefined
    , cb = fn || function () {}

    if (!username || !password) {
    return 'Email address/username and password are required'
  }

  superagent
    .post(vine.urls.loginUrl)
    .send('username='+username)
    .send('password='+password)
    .end(function(res) {

      if ( !res.body.success ) {
        vine.loggedIn = false
        return res.body.error
      }

      vine.session = res.body.data

      vine.loggedIn = true

      return cb( vine.session )

    })

}



vine.logout = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}

  superagent
    .delete(vine.urls.logoutUrl)
    .set('vine-session-id', vine.session.data.key)
    .end(function(res) {
      return cb( res.body.data )
    })

}



vine.getUserData = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}

  superagent
    .get(vine.urls.userUrl)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.user = res.body.data

      return cb( vine.user )

    })

}



vine.getTimeline = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}
    , url = vine.urls.timeline + vine.session.userId

  superagent
    .get(url)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.timeline = res.body.data

      return cb( vine.timeline )

    })

}



vine.getPopular = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}

  superagent
    .get(vine.urls.popular)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.popular = res.body.data

      return cb( vine.popular )

    })

}



vine.getTag = function (options, fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var tag = options || undefined

  if (!tag) {
    return 'A tag must be provided'
  }

  var cb = fn || function () {}
    , url = vine.urls.tag + tag

  superagent
    .get(vine.urls.tag + tag)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.tags = res.body.data

      return cb( vine.tags )

    })

}



vine.getNotifications = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}
    , url = vine.urls.notifications + vine.session.userId + '/pendingNotificationsCount'

  superagent
    .get(url)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.notifications = res.body.data

      return cb( vine.notifications )

    })

}



vine.getPromoted = function (fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}

  superagent
    .get(vine.urls.promoted)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.promoted = res.body.data

      return cb( vine.promoted )

    })

}



vine.userSearch = function (options, fn) {

  var searchTerm = options.searchTerm || undefined

  if (!searchTerm) {
    return 'A search term is required'
  }

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var cb = fn || function () {}
    , url = vine.urls.userSearch + searchTerm

  superagent
    .get(url)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.userSearchResults = res.body.data

      return cb( vine.userSearchResults )

    })

}



vine.userLikes = function (options, fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var id = options.userId || vine.session.userId
    , cb = fn || function () {}
    , url = vine.urls.userLikes + id + '/likes'

  superagent
    .get(url)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.userLikeResults = res.body.data

      return cb( vine.userLikeResults )

    })

}



vine.userFollowing = function (options, fn) {

  if (vine.loggedIn === false) {
    return 'User is not logged in'
  }

  var id = options.userId || vine.session.userId
    , cb = fn || function () {}
    , url = vine.urls.userFollowing + id + '/following/suggested/twitter'

  superagent
    .get(url)
    .set('vine-session-id', vine.session.key)
    .end(function(res){

      if ( !res.body.success ) {
        return res.body.error
      }

      vine.userFollowing = res.body.data

      return cb( vine.userFollowing )

    })

}



module.exports = vine


