var API = {};
(function($, undefined) {
/**
 * @brief This is a high level method to instanciate a new twitter widget
 * on the page.
 * 
 * @param user This will set what twitter user to bring in, as well as set a
 * handle on the container, and namespace the pub/sub events.
 * 
 * @param time This is an optional parameter. When set, it changes the frequency
 * of the publish events sent by the API; defaults to 3000.
 * 
 * @returns An object representing the widget just created.
 * 
 * @note There is no need to map API.newUser to another object, but by doing so
 * you can skip looking up widgets[user] later in code, and get a shortcut ref
 * to the widget's namespace.
 * 
 * @see 'js/classes/actions/CreateNewUser.js'
 * 
 */
    API.newUser = function( user, time ) {
        ((typeof time == 'undefined')? time = 3000 : time = time);
        widgets[user] = new ns.CreateNewUser(user).publish( time );
        return widgets[user];
    };
/**
 * @brief This is a high level method to stop all pub/sub actions for the user,
 * destroy the frame the user is updating in, delete all object references to the
 * widget, and destroy all state saved for the widget.
 *
 * @param user Specify which user to delete.
 * 
 * @note This is a total destructor that builds off of all other modules and
 * classes destruction calls. For a more granular destructor, you'll have to go
 * at least to the mid level API calls.
 * 
 * @see 'js/classes/actions/CreateNewUser.js'
 * @see 'js/classes/actions/GetTwitterUser.js'
 * @see 'js/classes/models/CreateNewWidget.js'
 * 
 */
    API.destroyUser = function( user ) {
        widgets[user].destroy();
    };
/**
 * @brief This is a high level class to create a subscription against a
 * specific widget's publishing events.
 * 
 * @param object This is a flexible parameter, which can be either a configuration
 * object, or a string. As a configuration object it takes two properties
 * - user The username of the twitter user and publishing widget to subscribe to
 * - handle The handle to use on the subscription. This has mid to low level
 *   implications, and cannot be utilized exclusively at the high level.
 * As a string, the parameter will represent the username of the widget to subscribe
 * to, and the class constructors will automatically assign a random handle to
 * the returned object.
 * 
 * @param callback A function to execute upon recieving a publish event on the
 * subscribed object.
 * 
 * @returns destroy A destruction method to kill the callback initially assigned
 * to the object.
 * 
 * @returns handle An accessor to read the internally assigned handle. Useful for
 * getting an automatically generated handle.
 * 
 * @see 'js/classes/actions/GetTwitterUser.js'
 * 
 */
    API.NewSubscription = function ( object, callback ) {
        var user, handle;
            if (typeof object == 'object') {
                user = object.user;
                handle = object.handle;
            } else {
                user = object;
                handle = user + '_' + Math.floor(Math.random()*100000001);
            }
            
            widgets[user].user.subscribe( handle, callback );
            
            this.destroy = function(){
                widgets[user].user.unsubscribe( handle );  
            };
            
            this.handle = function(){
                return handle;  
            };
    };
}(jQuery));