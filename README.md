#Vine

##Disclaimer

This is not in any part official and should be used at your own risk. Given there is no public API for Vine this is liable to break at any time.

##Installation

<pre>
  npm install request
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

###getUserData

```javascript
vine.getUserData(function (res) {
	console.log('user', res)
})
```


###getPopular

```javascript
vine.getPopular(function (res) {
	console.log('popular', res)
})
```

###getPromoted

```javascript
vine.getPromoted(function (res) {
	console.log('promoted', res)
})
```

###getNotifications

```javascript
vine.getNotifications(function (res) {
	console.log('notifications', res)
})
```

###getTimeline

```javascript
vine.getTimeline(function (res) {
	console.log('timeline', res)
})
```

###getTag

```javascript
vine.getTag('lbi', function (res) {
	console.log('tags', res)
})
```

###userSearch

```javascript
vine.userSearch('lbi', function (res) {
	console.log('usersearch', res)
})
```

###userLikes

```javascript
vine.userLikes({}, function (res) {
	console.log('like', res)
})
```

###userFollowing

```javascript
vine.userFollowing({}, function (res) {
	console.log('like', res)
})
```