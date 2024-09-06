"use strict";
var Mike = /** @class */ (function () {
    function Mike() {
        this.name = "Mike";
    }
    Mike.prototype.getName = function () {
        return this.name;
    };
    return Mike;
}());
function sayHello(recipient) {
    console.log("Hello, ".concat(recipient.name, "!"));
    console.log("Hello again, ".concat(recipient.getName(), "!"));
}
sayHello(new Mike());
