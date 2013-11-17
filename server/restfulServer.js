/**
 * Express server wrapper.
 *
 * @author tim.tang
 */

var _ = require('underscore'),
    fs = require('fs'),
    path = require('path'),
    application_root = path.resolve(__dirname, '..'),
    constants = require('../common/constants'),
    handlers= require('../handler'),
    express = require('express');


/**
 * Express router constructor.
 */
var RESTfulServer= function RESTfulServer() {
    restAPI= JSON.parse(fs.readFileSync(path.resolve(__dirname, '../resources/RESTfulAPI.json'), 'UTF-8'));
};

_.extend(RESTfulServer.prototype, {

    startup: function() {
        doConf();
        registerAPI(restAPI.routers);
        var port = process.env.PORT || constants.EXPRESS_PORT;
        app.listen(port, function() {
            console.log('Hearthstone server listening on port::%s', port);
        });
    }
});

/**
 * Do Express server configuration.
 *
 */
function doConf() {
    app.use(express.logger(constants.EXPRESS_ENV_DEV));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(application_root, constants.EXPRESS_PUBLIC)));
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
}

/**
 *
 * Register RESTful API routes.
 *
 * @param {URLOption} options for rest api configuration.
 *
 */
function registerAPI(routers) {
    _.each(routers, function(router) {
        _.each(handlers, function(handler){
            if (_.isFunction(handler[router.api]) && _.isString(router.url)) {
                console.log('Registering API-[%s] URL-[%s] METHOD-[%s]', router.api, router.url, router.method);
                switch (router.method) {

                case constants.ROUTER_METHOD_POST:
                    app.post(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                case constants.ROUTER_METHOD_PUT:
                    app.put(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                case constants.ROUTER_METHOD_GET:
                    app.get(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                case constants.ROUTER_METHOD_DELETE:
                    app.del(router.url, function(req, res) {
                        res.contentType(constants.CONTENT_TYPE);
                        handler[router.api](req, res);
                    });
                    break;

                default:
                    console.log('The METHOD-[%s] not supported!', router.method);
                }
            } else {
                console.log('Invalide API-[%s] or URL-[%s] in RESTfulAPI.json!', router.api, router.url);
            }
        });
    });
}

var restfulServer = new RESTfulServer(),
    app = express();

restfulServer.startup();

/* Public RESTful Server */
module.exports = restfulServer;