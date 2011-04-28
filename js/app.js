(function($, undefined) {
    ns.NewUser = function( user ) {
        var widget = ns.CreateNewWidget(user), _this = this;
        users[user] = new ns.GetTwitterUser(widget, 'ns_' + user, user);
        
        this.user = users[user];
        this.widget = widget;
        
        return {
            publish : function( time ) {
                setTimeout(function(){
                    users[user].startPublishing(((typeof time == 'undefined')? 3000 : time));
                }, 400);
                return _this;
            }
        };
    };
    
    widgets.buzzedword = new ns.NewUser('buzzedword').publish();
}(jQuery));