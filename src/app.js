"use strict";

var app = angular.module("LarmoApp", ["ngRoute", "ngSanitize", "headroom", "infinite-scroll"]);

(function() {
    app.config(["$routeProvider", function($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "templates/controllers/main.html",
            controller: "MainController"
        });

        $routeProvider.otherwise({redirectTo: "/"});
    }]);
})();