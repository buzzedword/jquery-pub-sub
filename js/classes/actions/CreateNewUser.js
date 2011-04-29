(function($, undefined){
    ns.CreateNewUser = function( user ) {
        var widget = ns.CreateNewWidget(user), _this = this;
        users[user] = new ns.GetTwitterUser(widget.selector, 'ns_' + user, user);
        
        this.user = users[user];
        this.widget = widget;
        
        this.destroy = function () {
            users[user].stopPublishing();
            widgets[user].widget.destroy();
            delete users[user];
            delete widgets[user];
            
        };
        
        return {
            publish : function( time ) {
                setTimeout(function(){
                    users[user].startPublishing(((typeof time == 'undefined')? 3000 : time));
                }, 400);
                widgets[user] = _this;
                return _this;
            }
        };
    };
}(jQuery));