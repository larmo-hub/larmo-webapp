(function() {
    app.service("APIService", ["AjaxService", "config", function(AjaxService, config) {
        var self = {
            getLatestMessages: getLatestMessages,
            getAvailableSources: getAvailableSources
        };

        return self;

        function getLatestMessages(filters, limit, offset) {
            var queryString = angular.extend(filters, {
                limit: limit,
                offset: offset ? offset : 0,
                t: new Date().getTime()
            });

            var url = config.api.url + "/latestMessages";
            return AjaxService.get(url, queryString);
        }

        function getAvailableSources() {
            var url = config.api.url + "/availableSources";
            return AjaxService.get(url, {t : new Date().getTime()});
        }
    }]);
})();
