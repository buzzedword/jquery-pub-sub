(function($, undefined){
    $.fn.linkify = function() {
        return this.each(function() {
            var $this = $(this), re = /((http|https|ftp):\/\/[\w?=&.\/-;#~%-]+(?![\w\s?&.\/;#~%"=-]*>))/g;
            $this.html( $this.html().replace(re, '<a href="$1" rel="nofollow" target="_blank">$1</a> ').replace(/\B#([_a-z0-9]+)/ig, 
                function(hashtag) {
                    return '<a href="http://twitter.com/search?q=%23'+hashtag.substring(1)+'" rel="nofollow" target="_blank">'+hashtag+'</a>';
                }));
            
            try {
              twttr.anywhere(function (_$) {
                _$($this).linkifyUsers();
              });
            } catch (e) {
                // squelch   
            }
        });
    };
}(jQuery));