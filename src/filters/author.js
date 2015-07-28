(function() {
    app.filter("displayName", function() {
        return function(input) {
            var emailAddress = input.email ? " (<a href=\"mailto:" + input.email + "\">" + input.email + "</a>)" : "";

            if (input.fullName) {
                return "<strong>" + input.fullName + "</strong>" + emailAddress;
            } else if (input.nickName) {
                return "<strong>" + input.nickName + "</strong>" + emailAddress;
            } else if (input.email) {
                return input.email;
            }

            return "Anonim";
        };
    });
})();
