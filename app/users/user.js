System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var User, Address;
    return {
        setters:[],
        execute: function() {
            User = (function () {
                function User() {
                    this.address = new Address();
                }
                return User;
            }());
            exports_1("User", User);
            Address = (function () {
                function Address() {
                }
                return Address;
            }());
            exports_1("Address", Address);
        }
    }
});
//# sourceMappingURL=user.js.map