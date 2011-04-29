(function($, undefined) {
/**
 * @brief This is the abstract logic function used to build the first set of 
 * widgets. Notice there is no construction being done on this page, only a
 * call to the API class.
 *
 * @note There is no need to map API.newUser to an object or element, as the
 * `widgets` object will automatically be populated with this user.
 *
 * @remarks The high level interface allows for a simple call to the API, and
 * minimal code needed to create an instance on the page. The low level interface
 * is significantly more complicated; that code should also be included here.
 *
 * @see 'js/api/public.js'
 */
    API.newUser('buzzedword');
}(jQuery));