var vine = {}
  , request = require('request')



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

	request.post( vine.urls.loginUrl, {
		form:{
			username: username
			, password: password
		}
	}, function (err, res, body) {
	 	var json = JSON.parse(body)

		if ( !json.success ) {
			vine.loggedIn = false
			return json.error
		}

		vine.session = json.data

		vine.loggedIn = true

		return cb( vine.session )

	})

}



vine.logout = function (fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}

	request.del( vine.urls.logoutUrl, {
		headers:{
			'vine-session-id': vine.session.data.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		return cb( json.data )

	})

}



vine.getUserData = function (fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}

	request.get( vine.urls.userUrl, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return vine.user.err
		}

		vine.user = json.data

		return cb( vine.user )

	})

}



vine.getTimeline = function (fn) {
	
	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}
    , url = vine.urls.timeline + vine.session.userId

	request.get( url, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.timeline = json.data

		return cb( vine.timeline )

	})

}



vine.getPopular = function (fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}

	request.get( vine.urls.popular, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.popular = json.data

	  return cb( vine.popular )

	})

}



vine.getTag = function (options, fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var tag = options.tag || undefined

	if (!tag) {
		return 'A tag must be provided'
	}

  var cb = fn || function () {}
    , url = vine.urls.tag + tag

	request.get( vine.urls.tag + tag, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.tags = json.data

		return cb( vine.tags )

	})

}



vine.getNotifications = function (fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}
    , url = vine.urls.notifications + vine.session.userId + '/pendingNotificationsCount'

	request.get( url, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.notifications = json.data

		return cb( vine.notifications )

	})

}



vine.getPromoted = function (fn) {

	if (vine.loggedIn === false) {
		return 'User is not logged in'
	}

  var cb = fn || function () {}

	request.get( vine.urls.promoted, {
		headers:{
			'vine-session-id': vine.session.key
		}
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.promoted = json.data

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

	request.get( url, {
		headers:{
			'vine-session-id': vine.session.key
		}		
	}, function (err, res, body) {

		var json = JSON.parse(body)

		if ( !json.success ) {
			return json.error
		}

		vine.userSearchResults = json.data

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

  request.get( url, {
    headers:{
      'vine-session-id': vine.session.key
    }   
  }, function (err, res, body) {

    var json = JSON.parse(body)

    if ( !json.success ) {
      return json.error
    }

    vine.userLikeResults = json.data

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

  request.get( url, {
    headers:{
      'vine-session-id': vine.session.key
    }   
  }, function (err, res, body) {

    var json = JSON.parse(body)

    if ( !json.success ) {
      return json.error
    }

    vine.userFollowing = json.data

    return cb( vine.userFollowing )

  })

}



module.exports = vine


