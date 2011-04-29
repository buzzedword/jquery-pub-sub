var API = {};
(function($, undefined) {
    API.newUser = function( user, time ) {
        ((typeof time == 'undefined')? time = 3000 : time = time);
        widgets[user] = new ns.CreateNewUser(user).publish( time );
        return widgets[user];
    };
    API.destroyUser = function( user ) {
        widgets[user].destroy();
    };
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