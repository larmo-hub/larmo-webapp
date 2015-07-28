(function() {
    app.controller("MainController", ["$scope", "APIService", function($scope, APIService) {
        $scope.messages = [];
        $scope.filters = {source: ""};
        $scope.setupLatestMessages = setupLatestMessages;

        setupAvailableSources();
        setupLatestMessages();

        function setupAvailableSources() {
            APIService.getAvailableSources().then(function(response) {
                $scope.sources = response.data;
            });
        }

        function setupLatestMessages() {
            var filters = angular.copy($scope.filters);
            var limit = 10;

            APIService.getLatestMessages(filters, limit).then(function(response) {
                $scope.messages = response.data;
            });
        }
    }]);
})();
