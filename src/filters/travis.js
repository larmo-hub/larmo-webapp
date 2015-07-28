(function() {
    app.filter('travisSetStatusIcon', setStatusIcon);
    app.filter('travisSetDescription', setDescription);

    function setStatusIcon() {
        return function(state) {
            if(state === 'passed' || state === 'fixed') {
                return 'fa-check';
            } else if(state === 'broken' || state === 'failed') {
                return 'fa-remove';
            } else if(state === 'errored') {
                return 'fa-exclamation';
            } else {
                return 'fa-gears';
            }
        };
    }

    function setDescription() {
        return function(extras) {
            var number = '',
                url = '',
                type = '';

            if(extras.git_url) {
                url = '<a href="' + extras.git_url + '">{{number}}</a>';
            }

            if(extras.type) {
                type = extras.type.replace('_', ' ');
            }

            if(extras.type === 'push') {
                number = extras.git_number ? extras.git_number.substr(0, 10) : '';
            } else {
                number = extras.git_number ? '#' + extras.git_number : '';
            }

            return type + ' ' + url.replace('{{number}}', number);
        }
    }
})();
