# An experiment with Pub/Sub

This started purely as an experiment with Pub/Sub, but has grown into a class based architecture.

Please know, I'm perfectly aware of how inefficient this is, this is purely just fooling around and trying to mimic a compiled language on the client side.

Goals for this experiment:
  * Make sure each class is independant of siblings within the same module. 
    Exception: classes can be dependant cross module.
  * Expose each class to a namespace `ns`.
  * Offer a low level, mid level, and high level API. Ensure that the low level still allows the developer to create the high level widget without additional code.
  * Load the classes in dependancy ordering, make sure no class is loaded before its required parent.

# How to use the high level API

At this point, I've really only refined the high level API for usage.

## Create a new user

`API.newUser( **string** username, _optional_ **integer** interval );`
This will start a new widget instance on the page with the specified user. If you specify an interval, this will set the interval at which the updates process.
If no interval is set, interval defaults to 3000ms.

## Delete a user

`API.deleteUser( **string** username );`
This removes the widget with the set username, deletes all references on the page to this user, destroys all pubsub actions associated, and deletes all keys created for the user.

## Create a new subscription to user

`var _myObject_ = new API.NewSubscription( **object** { 'user' : **string** username, 'handle' : **string** subscriptionLabel }, **function** callback);`
or
`var _myObject_ = new API.NewSubscription( **string** username, **function** callback);`

`returns .destroy(), .handle();`

This will allow you to create a callback to the publish event on the specified user. If you do not specify a handle, it will be automatically generated for you and can be called with the `.handle()` method.
The high level API returns an object to represent the specific callback mapped to this request.

## Delete a subscription to user

`_myObject_.destroy()`
Deletes the callback subscription associated to this object.