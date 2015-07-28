(function() {
    app.controller("MainController", ["$scope", "APIService", function($scope, APIService) {
        var offset = 0;
        var limit = 10;

        $scope.messages = [];
        $scope.filters = {source: ""};
        $scope.setupLatestMessages = setupLatestMessages;
        $scope.getMoreMessages = setupLatestMessages;
        $scope.stopLoadingMore = false;

        setupAvailableSources();
        setupLatestMessages();

        function setupAvailableSources() {
            APIService.getAvailableSources().then(function(response) {
                $scope.sources = response.data;
            });
        }

        function setupLatestMessages() {
            if($scope.stopLoadingMore) return;

            var filters = angular.copy($scope.filters);
            $scope.stopLoadingMore = true;

            APIService.getLatestMessages(filters, limit, offset).then(function(response) {
                response.data.forEach(function(el) {
                  $scope.messages.push(el);
                });

                if(response.data.length > 0) {
                  $scope.stopLoadingMore = false;
                }

                offset += response.data.length;
            });
        }
    }]);
})();
