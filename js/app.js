var ns = {}, users = {};

// This class creates a Twitter instance to subscribe to.
// @param selector | jQuery selector to update status against.
// @param handler | string to use as an event handler in amplify. Request, Subscribe, and Publish events are mapped to this.
// @param user | Twitter user to create.

function GetTwitterUser( selector, handler, user ) {
    var interval, map = {}, count;
/* Constructors */    
    // This set will predefine the AJAX call and cache with whatever client side caching is available.
    amplify.request.define( handler, "ajax", {
        url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + user + "&callback=?",
        dataType: "json",
        type: "GET",
        cache: "persist"
    });
    
    // This is a global subscription to the GetTwitterUser class actions.
    amplify.subscribe( handler, function( payload ){
        if (typeof payload.incoming !== 'undefined') {
            selector.append('<p>' + payload.incoming + '</p>');
        } else if (typeof payload.destroy !== 'undefined') {
            selector.html('');
        }
    });
    
    // This executes the AJAX request previously defined. TODO add polling.
    amplify.request( handler, function(data) {
        map.data = data;
        map.count = data.length;
    });
/* End Constructors */
/* Public functions */
    // This will begin emitting updates one at a time with the given constraints from the constructor, and will reset after all have incremented.
    this.startPublishing = function( time ){
        count = 0;
        interval = setInterval(function(){
            if (count > 18) { count = 0; amplify.publish( handler, { 'destroy' : true}); }
            amplify.publish( handler, { 'incoming' : map.data[count].text });
            count++;
        }, ((typeof time !== 'undefined')? time : 3000));   
    };
    // This is a destruction function for emitting events. TODO add complete destruction methods.
    this.stopPublishing = function(){
        clearInterval(interval);
        amplify.publish( handler, { 'destroy' : true});
    };
}

users.buzzedword = new GetTwitterUser( $('#buzzedword'), "twitter", "buzzedword");
users.buzzedword.startPublishing(); /* This method also takes an interval as a parameter. */