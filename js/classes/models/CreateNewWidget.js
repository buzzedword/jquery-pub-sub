(function($, undefined){
    ns.CreateNewWidget = function( id, width ){
          var widthValue, _this = this;
            ((typeof width == 'undefined')? width = 'grid_3' : width = width);
            widthValue = width.replace('grid_', '');
            
            (function buildWidget( ) {
                var element = document.createElement('div');
                    element.setAttribute('id', id);
                    element.setAttribute('class', width + ' widget');
                    document.getElementById(widgets.container).appendChild(element);
            }());
            
            this.destroy = function(){
                $('#' + id).remove();
            };
            
            this.value = function(){
                return widthValue;   
            };
            
            return {
                selector : $('#' + id),
                destroy : _this.destroy,
                value : _this.value
            }
    };
}(jQuery));