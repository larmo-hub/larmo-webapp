(function() {
    app.filter('githubUser', GithubUser);
    app.filter('githubAction', GithubAction);
    app.filter('githubExtendedMessage', GithubExtendedMessage);

    function GithubUser() {
        return function(input) {
            var name = 'Anonim';

            if (input.nickName) {
                name = '<a href="http://github.com/' + input.nickName + '" target="_blank">' + input.nickName + '</a>';
            } else if (input.fullName) {
                name = input.fullName;
            } else if (input.email) {
                name = input.email;
            }

            return '<span class="user">' + name + '</span>';
        };
    }

    function GithubAction() {
        return function(input) {
            var action = '';

            if(input.type == 'github.commit') {
                action = '<a href="' + input.extras.url + '" target="new">' + input.extras.id.substr(0, 10) + '</a>';
            } else if(input.type == 'github.issue_comment_created') {
                action = '<a href="' + input.extras.url + '" target="new">#' + input.extras.issue_number + '</a>';
            } else if(input.type.indexOf('github.pull_request') || input.type.indexOf('github.issue')) {
                action = '<a href="' + input.extras.url + '" target="new">#' + input.extras.number + '</a>';
            }

            return action;
        }
    }

    function GithubExtendedMessage() {
        return function(input) {
            var message = '';

            if(input.type == 'github.commit') {
                message = input.extras.body;
            } else if(input.type == 'github.issue_opened') {
                message = '<strong>' + input.extras.title + '</strong><br/>' + input.extras.body;
            } else if(input.type == 'github.issue_comment_created') {
                message = input.extras.body;
            }

            return message;
        }
    }
})();
