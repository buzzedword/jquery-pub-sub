(function($, undefined){
    ns.CreateNewWidget = function( id, width ){
          var widthValue;
            ((typeof width == 'undefined')? width = 'grid_3' : width = width);
            widthValue = width.replace('grid_', '');
            
            (function buildWidget( ) {
                var element = document.createElement('div');
                    element.setAttribute('id', id);
                    element.setAttribute('class', 'width');
                    document.getElementById(widgets.container).appendChild(element);
            }());
            
            this.destroy = function(){
                var element = document.getElementById(id);
                document.removeChild(element);
            };
            
            this.value = function(){
                return widthValue;   
            };
            
            return $('#' + id);
    };
}(jQuery));