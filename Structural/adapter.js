/**
 * The Adapter pattern translates one interface (an object's properties and methods) to another. 
 * Adapters allows programming components to work together that otherwise wouldn't because of mismatched 
 * interfaces. The Adapter pattern is also referred to as the Wrapper Pattern.
 * 
 * One scenario where Adapters are commonly used is when new components need to be integrated and work 
 * together with existing components in the application.
 * 
 * Another scenario is refactoring in which parts of the program are rewritten with an improved interface, 
 * but the old code still expects the original interface.
 */

/**
 * The adapter design pattern solves problems like:
 * 
 * How can a class be reused that does not have an interface that a client requires?
 * How can classes that have incompatible interfaces work together?
 * How can an alternative interface be provided for a class?
 */

//old interface
function Shipping() {
    this.request = function (zipStart, zipEnd, weight) {
        return '$490';
    }
}

//new interface
function AdvancedShipping() {
    this.login = function (credentials) {};
    this.setStart = function (start) {};
    this.setDestination = function (destination) {};
    this.calculate = function (weight) {
        return '$380';
    };
}

//adapter interface
function ShippingAdapter(credentials) {
    const shipping = new AdvancedShipping();

    shipping.login(credentials);

    return {
        request: function (zipStart, zipEnd, weight) {
            shipping.setStart = zipStart;
            shipping.setDestination = zipEnd;
            return shipping.calculate(weight);
        }
    };
}

// helper function
const log = (function () {
    let log = "";

    return {
        add: function (msg) {
            log += msg + "\n";
        },
        show: function () {
            console.log(log);
            log = "";
        }
    }
})();


function run (){
    const shipping = new Shipping();
    const credentials = {token: '09d-280ef'};
    const adapter = new ShippingAdapter(credentials);

    //original shipping interface
    let cost = shipping.request('12212', '43231', '32 lbs');
    log.add('Old Cost: ' + cost);

    //new shipping object with adpated interface
    cost = adapter.request('12212', '43231', '32 lbs');
    log.add('New Cost: ' + cost);

    log.show()    ;
}

run();



