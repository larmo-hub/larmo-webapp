(function() {
    app.filter('githubUser', GithubUser);
    app.filter('githubAction', GithubAction);
    app.filter('githubExtendedMessage', GithubExtendedMessage);
    app.filter('githubRepositoryInformation', RepositoryInformation);

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
            var mock = '<a href="' + input.extras.url + '" target="new">#{{URL_DESCRIPTION}}</a>';

            if(input.type.indexOf('github.pull_request') || input.type.indexOf('github.issue')) {
                action = mock.replace('{{URL_DESCRIPTION}}', input.extras.number);
            }

            switch(input.type) {
                case 'github.commit':
                    action = mock.replace('#{{URL_DESCRIPTION}}', input.extras.id.substr(0, 10));
                    break;
                case 'github.issue_comment_created':
                    action = mock.replace('{{URL_DESCRIPTION}}', input.extras.issue_number);
                    break;
                case 'github.pull_request_review_comment_created':
                    action = mock.replace('{{URL_DESCRIPTION}}', input.extras.pull_request_number);
                    break;
                case 'github.create_branch':
                    action = '<a href="http://github.com/' +
                        input.extras.repository.full_name + '/tree/' +
                        input.extras.ref + '">' +
                        input.extras.ref + '</a>';
                    break;
            }

            return action;
        }
    }

    function GithubExtendedMessage() {
        return function(input) {
            var message = '';
            var actions = ['github.commit', 'github.issue_comment_created', 'github.pull_request_review_comment_created'];

            if(actions.indexOf(input.type) > -1) {
                message = input.extras.body;
            } else if(input.type == 'github.issue_opened') {
                message = '<strong>' + input.extras.title + '</strong><br/>' + input.extras.body;
            }

            return message;
        }
    }

    function RepositoryInformation() {
        return function(extras) {
            var repository, information = '';

            if(extras.repository) {
                repository = extras.repository;

                if(!repository.full_name) {
                    repository.full_name = repository.owner + '/' + repository.name;
                }

                if(extras.branch) {
                    information += 'to <a href="https://github.com/' + repository.full_name + '/tree/' + extras.branch + '">' + extras.branch + '</a> ';
                }

                information += 'at <a href="https://github.com/' + repository.full_name + '">' + repository.full_name + '</a>';
            }

            return information;
        }
    }
})();
