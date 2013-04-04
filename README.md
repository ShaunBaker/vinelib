#Vine

##Disclaimer

This is not in any part official and should be used at your own risk. Given there is no public API for Vine this is liable to break at any time.

##Installation

<pre>
  npm install vinelib
</pre>

##Examples

Require the lib and put it to use:

```javascript
var vine = require('vine')
```

###Login

```javascript
vine.login({
  username: 'USERNAME OR EMAIL ADDRESS'
  , password: 'PASSWORD'
}, function (res) {});
```

###Get Users Data

```javascript
vine.getUserData(function (res) {
	console.log('user', res)
})
```

###Get Popular Vines

```javascript
vine.getPopular(function (res) {
	console.log('popular', res)
})
```

###Get Promoted Vines

```javascript
vine.getPromoted(function (res) {
	console.log('promoted', res)
})
```

###Get User Notifications

```javascript
vine.getNotifications(function (res) {
	console.log('notifications', res)
})
```

###Get Users Timeline

```javascript
vine.getTimeline(function (res) {
	console.log('timeline', res)
})
```

###Get Vines By Tag

```javascript
vine.getTag('github', function (res) {
	console.log('tags', res)
})
```

###Search For a User

```javascript
vine.userSearch('github', function (res) {
	console.log('usersearch', res)
})
```

###Get A Users Likes

```javascript
vine.userLikes({}, function (res) {
	console.log('like', res)
})
```

###Get Users That A User Is Following

```javascript
vine.userFollowing({}, function (res) {
	console.log('like', res)
})
```