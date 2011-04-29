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
    // This starts it all up. You can set a publish time here too.
    API.newUser('buzzedword');
}(jQuery));