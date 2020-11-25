router = window.router || {};

router.Router = (function () {
    function Router () {
        this._routes = {};
    };

    Router.prototype.add_route = function(route, handler) {
        this._routes[route] = handler;
    };

    Router.prototype.dispatch = function() {
        var params  = location.pathname.split('/').slice(1),
            route   = params.shift(),
            handler = this._routes[route];
        if (handler) {
            handler.apply(this, params);
        };
    };

    Router.prototype.go = function(route, _params_) {
        _params_ = Array.prototype.slice.call(arguments, 1);
        var path = '/' + [route].concat(_params_).join('/');
        history.pushState({}, route, path);       
    };

    return Router
})();

window.globalRouter = new router.Router();
