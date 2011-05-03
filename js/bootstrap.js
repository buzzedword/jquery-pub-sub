/**
 * @object amplify Stores values for all libraries in the amplify suite.
 * 
 * @returns
 * - core This is the main pub/sub library
 * - request This is the AJAX request abstraction layer
 * - store This is the client side storage abstraction layer
 */
var amplify = {
    core: 'amplify/core/amplify.core.js',
    request: 'amplify/request/amplify.request.js',
    store: 'amplify/store/amplify.store.js'
},
/**
 * @object api This is the public interface to all API levels.
 * 
 * @returns
 * - public This is the high level API.
 */ 
    api = {
        'public': 'js/api/public.js'
    },
/**
 * @object classes This is where all construction, action, and destruction classes
 * are stored.
 * 
 * @returns
 * - actions All interactivity with the application stems from here.
 * - models All DOM manipulation with the application stems from here.
 * - templates Not implemented yet.
 */ 
    classes = {
/**
 * @object actions All interactivity begins here. Providing a low level interface
 * to all API hooks.
 * 
 * @returns
 * - GetTwitterUser Creates a publish/subscription object on a low level for usage
 * in a widget.
 * - CreateNewUser Mid level interface against GetTwitterUser offering simple high
 * functionality while exposing low level granularity
 */ 
        actions: {
            GetTwitterUser: 'js/classes/actions/GetTwitterUser.js',
            CreateNewUser: 'js/classes/actions/CreateNewUser.js'
        },
/**
 * @object models All DOM manipulation begins here. Providing an abstract for a
 * widget framework.
 * 
 * @returns
 * - CreateNewWidget Abstract for a timed delay widget. Will display 20 tweets
 * every 3000ms by default, new tweets are slowly pushed down by old tweets.
 */ 
        models: { 
            CreateNewWidget: 'js/classes/models/CreateNewWidget.js'
        },
/**
 * @object templates This is currently not implemented.
 * 
 * @notes This will eventually be where DOM fragments are stored for use by the
 * widgets in models.
 */ 
        templates: {

        }
    },
/**
 * @object jquery This stores the definitions for all key jquery functionality
 * 
 * @returns
 * - core The Google AJAX Lib location for the latest version of jQuery.
 * - ui The Google AJAX Lib location for the latest version of jQueryUI.
 * - plugins An object which contains all plugins to be added to the application
 */ 
    jquery = {
        core: '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
        ui: '//ajax.googleapis.com/ajax/libs/jqueryui/1/jquery-ui.min.js',
/**
 * @object plugins Third party and internal plugins for use with the application
 * 
 * @returns
 * - linkify Plugin made for purposes of this demo to automatically link twitter
 * users to their accounts using the @Anywhere API, as well as link hashtags
 * using RegEx and the Search API.
 */ 
        plugins: {
            linkify: 'js/classes/plugins/LinkifyTwitterUser.js'
        }
    },
/**
 * @object twitter Stores the definition for objects related to the Twitter API
 * 
 * @param id The @Anywhere application ID you registered at dev.twitter.com
 * 
 * @returns
 * - anywhere The location of the latest twitter API endpoint.
 */ 
    twitter = {
        anywhere: 'http://platform.twitter.com/anywhere.js?id=PTCg18m6wjTcKE4WvUNng'
    },
/**
 * @object widgets Utility object for use by widgets to reference the container
 * element in vanilla JS.
 * 
 * @returns
 * - container The english ID of the container.
 * - $container The CSS representation of the english ID.
 */ 
    widgets = {
        container: 'container',
        $container: '#container'
    },
/**
 * @public
 * @object ns Utility object for use as a namespace for functions.
 */ 
    ns = {},
/**
 * @public
 * @object users Utility object for use as a namespace for users.
 */ 
    users = {};
/**
 * @function
 * @brief This step brings in all jQuery modules, and the twitter @anywhere end-
 * point.
 * 
 * @notes Core functionality
 * 
 * @remarks Since all the modules listed below depend on these features, make sure
 * this group loads first.
 */ 
head.js(
jquery.core, jquery.ui, twitter.anywhere, function () {
/**
 * @function callback
 * @brief This step brings in all Amplify modules, readying the application to
 * publish, subscribe, request data, and persistently store data.
 * 
 * @notes PubSub functionality, AJAX functionality, Storage functionality
 * 
 * @remarks These depend on jQuery, make sure it's loaded first. The application
 * uses Amplify to do most if not all functionality, so block all scripts until
 * loaded.
 */ 
    head.js(
    amplify.core, amplify.request, amplify.store, function () {
/**
 * @function callback
 * @brief This step brings in all jQuery plugins defined in the jquery module.
 * 
 * @notes Extensible functionality and utility methods.
 * 
 * @remarks Since we made our own plugin, as a safety measure we want to load
 * all plugins after both dependancies. Since we will be using the plugins in our
 * apps as helpers, block remaining scripts from loading.
 */ 
        head.js(
        jquery.plugins.linkify, function () {
/**
 * @function callback
 * @brief This step brings in all defined classes, and general application modules
 * 
 * @notes Core application functionality and classes
 * 
 * @remarks These classes are built with jQuery and Amplify-- makes sense to be one
 * of the last modules to load. At this point, it is completely safe to call on
 * jQuery with confidence and ensure all dependancies are ready to be used.
 */ 
            head.js(
            classes.actions.GetTwitterUser, classes.actions.CreateNewUser, classes.models.CreateNewWidget, function () {
/**
 * @function callback
 * @brief This step brings in the API abstraction level
 * 
 * @notes Low, Mid, High level API.
 * 
 * @remarks This interface strings together all the classes to provide a usable
 * method and objects for use in the application. We require all classes to be defined
 * if we want to use it.
 */ 
                head.js(
                api['public'], function () {
/**
 * @function callback
 * @brief This step is the actual application logic. We've built a nice framework
 * with all the classes and interfaces, it's time to use it! This is the last loading
 * step. The segmented stepping has ensured all API pieces load timely.
 * 
 * @notes Application logic, loosely coupled API calls.
 * 
 * @remarks That's it buddy! This file is where you actually utilize all the other
 * classes and API interfaces as you see fit. You should not be adding any other
 * libraries or files-- it just makes no sense.
 */ 
                    head.js('js/app.js');
                });
            });
        });
    });
});
