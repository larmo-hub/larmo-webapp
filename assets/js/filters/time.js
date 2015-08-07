(function() {
    app.controller('MainController').directive('momentTimeAgo', ['$interval', function($interval) {
        function link(scope, element, attrs) {
            var timestamp;

            function updateTime() {
                var messageTime = moment(timestamp);
                var todayTime = moment();
                var output = "";

                if (todayTime.diff(messageTime, 'days') < 3) {
                    output = messageTime.fromNow();
                } else {
                    output = messageTime.format('LLLL');
                }

                element.text(output);
            }


            scope.$watch(attrs.momentTimeAgo, function(value) {
                timestamp = value;
                updateTime();
            });

            $interval(function() {
                updateTime(); // update DOM
            }, 45000);
        }

        return {
            link: link
        };
    }]);
})();
