var ns = {}, users = {};

function GetTwitterUser( selector, handler, user ) {
    var interval, map = {}, count;
        
    amplify.request.define( handler, "ajax", {
        url: "http://api.twitter.com/1/statuses/user_timeline.json?screen_name=" + user + "&callback=?",
        dataType: "json",
        type: "GET"
    });
    amplify.subscribe( handler, function( payload ){
        if (typeof payload.incoming !== 'undefined') {
            selector.append('<p>' + payload.incoming + '</p>');
        } else if (typeof payload.destroy !== 'undefined') {
            selector.html('');
        }
    });
    
    amplify.request( handler, function(data) {
        map.data = data;
        map.count = data.length;
    });
    
    this.startPublishing = function( time ){
        count = 0;
        interval = setInterval(function(){
            if (count > 18) { count = 0; amplify.publish( handler, { 'destroy' : true}); }
            amplify.publish( handler, { 'incoming' : map.data[count].text });
            count++;
        }, ((typeof time !== 'undefined')? time : 3000));   
    };
    this.stopPublishing = function(){
        clearInterval(interval);
        amplify.publish( handler, { 'destroy' : true});
    };
}

users.buzzedword = new GetTwitterUser( $('#buzzedword'), "twitter", "buzzedword");
users.buzzedword.startPublishing();