(function(){
    app.filter('scrutinizerUrlToInspection', urlToInspection);
    app.filter('scrutinizerSetDescription', setDescription);
    app.filter('scrutinizerSetRepoInfo', repoInfo);

    function urlToInspection() {
        return function(extras) {
            return "https://scrutinizer-ci.com/g/" + extras.repository.user + "/" + extras.repository.name + "/inspections/" + extras.id;
        }
    }

    function setDescription() {
        return function(extras) {
            var description = [];

            [
                {
                    count: extras.results.added_code_elements,
                    text: "code element{{suffix}} {{verb}} added"
                }, {
                count: extras.results.changed_code_elements,
                text: "code element{{suffix}} {{verb}} changed"
            }, {
                count: extras.results.removed_code_elements,
                text: "code element{{suffix}} {{verb}} removed"
            }, {
                count: extras.results.new_issues,
                text: "new issue{{suffix}} {{verb}} introduced"
            }, {
                count: extras.results.fixed_issues,
                text: "issue{{suffix}} {{verb}} fixed"
            }, {
                count: extras.results.common_issues,
                text: "issue{{suffix}} unresolved"
            }
            ].forEach(function(el){
                    if(el.count > 0) {
                        description.push(setTextWithCorrectVerb(el.count, el.text));
                    }
                });

            return description.join(", ");
        }
    }

    function setTextWithCorrectVerb(count, text) {
        var verb = "was",
            suffix = "";

        if(count > 1) {
            verb = "were";
            suffix = "s";
        }

        return "<strong>" + count + "</strong> " + text.replace("{{suffix}}", suffix).replace("{{verb}}", verb);
    }

    function repoInfo() {
        return function(repository) {
            var repo = repository.user  + '/' + repository.name;
            var repoUrl = '<a href="https://github.com/' + repo + '" target="_blank">' + repo + '</a>';
            var branchUrl = '<a href="https://github.com/' + repo + '/tree/' + repository.branch + '" target="_blank">' + repository.branch + '</a>';

            return branchUrl + ' at ' + repoUrl;
        }
    }
})();

