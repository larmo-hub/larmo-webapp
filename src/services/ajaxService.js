(function() {
    app.service("AjaxService", ["$http", function($http) {
        var self = {
            get: get,
            post: post
        };

        return self;

        function parseObjectToQueryString(data) {
            var queryString = "";

            for (var dataKey in data) {
                var dataValue = data[dataKey];

                if (dataValue) {
                    queryString += "&" + dataKey + "=" + dataValue;
                }
            }

            return queryString;
        }

        function prepareUrl(url, queryStringData) {
            var queryString = queryStringData ? parseObjectToQueryString(queryStringData) : "";

            if (url.indexOf("?") === -1) {
                queryString = queryString.replace("&", "?");
            }

            return url + queryString;
        }

        function executeCallback(callback, data) {
            if (callback) {
                callback(data);
            }
        }

        function get(url, queryStringData, successCallback, errorCallback) {
            var url = prepareUrl(url, queryStringData);

            console.log("[AjaxService] Sent request GET " + url);

            return $http.get(url).success(function (response) {
                console.log("[AjaxService] Response GET " + url, response);
                executeCallback(successCallback, response);
            }).error(function (response) {
                executeCallback(errorCallback, response);
            });
        }

        function post(url, data, successCallback, errorCallback) {
            console.log("[AjaxService] Sent request POST " + url, data);

            return $http.post(url, data).success(function (response) {
                console.log("[AjaxService] Response POST " + url, response);
                executeCallback(successCallback, response);
            }).error(function (response) {
                executeCallback(errorCallback, response);
            });
        }
    }]);
})();