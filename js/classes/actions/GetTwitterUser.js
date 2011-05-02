(function($, undefined) {
    /**
     * @brief This class is a low level interface to get a twitter user, and set
     * up all Pub/Sub hooks. This also serves to namespace all events sent to the
     * amplify subscription module, and will return an object to display all 
     * handlers assigned to each instance of the class.
     * 
     * @note This class heavily relies on the amplify.subscribe, publish, and 
     * request. Amplify does not fully namespace all pub/sub events, so this will
     * provide a structure to do so.
     * 
     * @param selector The jQuery object to use as a target. This is not the 
     * selection string, but the full query. All scoping must be done outside of
     * the class.
     * 
     * @param handler The label to use for all namespaced events and pubsub.
     * 
     * @param user Define the twitter user to look up and wire pubsub against.
     * 
     */
    
    ns.GetTwitterUser = function ( selector, handler, user ) {
        var interval, map = {}, count, handlers = {};
    /**
     * @constructor amplify.request.define This set will predefine the AJAX call
     * and cache with whatever client side caching is available.
     */
        amplify.request.define( handler, "ajax", {
            url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + user + "&callback=?",
            dataType: "json",
            type: "GET",
            cache: "persist"
        });
        
        /**
         * @constructor amplify.subscribe This is a global subscription to the 
         * GetTwitterUser class actions.
         */ 
        amplify.subscribe( handler, function( payload ){
            if (typeof payload.incoming !== 'undefined') {
                selector.prepend('<p>' + payload.incoming + '</p>').linkify();
            } else if (typeof payload.destroy !== 'undefined') {
                selector.html('');
            }
        });
        
        /** 
         * @constructor amplify.request This executes the AJAX request previously
         * defined. TODO add polling.
         */
        amplify.request( handler, function(data) {
            map.data = data;
            map.count = data.length;
        });
    
        /** 
         * @public
         * 
         * @function startPublishing This will begin emitting updates one at a 
         * time with the given constraints from the constructor, and will reset 
         * after all have incremented.
         */
        this.startPublishing = function( time ){
            count = 0;
            interval = setInterval(function(){
                if (count > map.count - 1) { count = 0; amplify.publish( handler, { 'destroy' : true}); }
                amplify.publish( handler, { 'incoming' : map.data[count].text });
                count++;
            }, ((typeof time !== 'undefined')? time : 3000));   
            return time;
        };
        /** 
         * @public
         * 
         * @function stopPublishing This is a destruction function for emitting 
         * events. TODO add complete destruction methods.
         */
        this.stopPublishing = function(){
            clearInterval(interval);
            amplify.publish( handler, { 'destroy' : true});
        };
        /** 
         * @public
         * 
         * @function subscribe This allows for object specific subscriptions
         */ 
        this.subscribe = function( handle, callback ) {
            if (typeof handle == 'undefined' || typeof handle !== 'string') {
                return undefined;
            } else {
                try {
                    if (typeof handlers[handle] !== 'undefined') {
                        throw "Handle: " + handle + " is already defined.";
                    } else {
                        if (typeof callback == 'function') {
                            handlers[handle] = {
                                'definition' : callback  
                            };
                            amplify.subscribe( handler, handlers[handle], callback);
                            return callback;
                        } else {
                            return undefined;   
                        }
                    }
                } catch (e) {
                    // squelch   
                }
            }
        };
        /** 
         * @public
         * 
         * @function unsubscribe This will unsubscribe from a specific handle.
         * 
         */ 
        this.unsubscribe = function ( handle ) {
            if (typeof handlers[handle] !== undefined) {
                amplify.unsubscribe( handler, handlers[handle].definition);
                delete handlers[handle];
            }
        };
        /** 
         * @public
         * 
         * @function listSubscriptions This is the public interface to see all 
         * handlers.
         * 
         */ 
        this.listSubscriptions = function() {
            return handlers;  
        };
    };
}(jQuery));