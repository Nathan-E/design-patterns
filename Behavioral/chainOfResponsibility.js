/**
 * The Chain of Responsibility pattern provides a chain of loosely coupled objects one of which can satisfy a 
 * request. This pattern is essentially a linear search for an object that can handle a particular request.

    An example of a chain-of-responsibility is event-bubbling in which an event propagates through 
    a series of nested controls one of which may choose to handle the event.

    The Chain of Responsiblity patterns is related to the Chaining Pattern which is frequently used in 
    JavaScript (jQuery makes extensive use of this pattern).
 */

const Request = function(amount) {
    this.amount = amount;
    log.add("Requested: $" + amount + "\n");
}
 
Request.prototype = {
    get: function(bill) {
        const count = Math.floor(this.amount / bill);
        this.amount -= count * bill;
        log.add("Dispense " + count + " $" + bill + " bills");
        return this;
    }
}
 
// log helper 
 
const log = (function() {
    let log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();
 
function run() {
    const request = new Request(378);
 
    request.get(100).get(50).get(20).get(10).get(5).get(1);
 
    log.show();
}

run();