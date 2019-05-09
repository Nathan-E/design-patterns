/**
 * The Flyweight pattern conserves memory by sharing large numbers of fine-grained objects efficiently. 
 * Shared flyweight objects are immutable, that is, they cannot be changed as they represent the 
 * characteristics that are shared with other objects.
 * 
 * Essentially Flyweight is an 'object normalization technique' in which common properties are factored 
 * out into shared flyweight objects. (Note: the idea is similar to data model normalization, a process 
 * in which the modeler attempts to minimize redundancy).
 * 
 * An example of the Flyweight Pattern is within the JavaScript engine itself which maintains a list of 
 * immutable strings that are shared across the application.
 * 
 * Other examples include characters and line-styles in a word processor, or 'digit receivers' in a public 
 * switched telephone network application. You will find flyweights mostly in utility type applications 
 * such as word processors, graphics programs, and network apps; they are less often used in data-driven 
 * business type applications.
 * 
 */

/**
 * The Flyweight pattern is a classical structural solution for optimizing code that is repetitive, slow, 
 * and inefficiently shares data. It aims to minimize the use of memory in an application by sharing as 
 * much data as possible with related objects (e.g., application configuration, state).
 * 
 * In practice, Flyweight data sharing can involve taking several similar objects or data constructs used 
 * by a number of objects and placing this data into a single external object. We can pass through this 
 * object through to those depending on this data, rather than storing identical data across each one.
 */

/**
 * Using Flyweights
 * 
 * There are two ways in which the Flyweight pattern can be applied. The first is at the data layer, where 
 * we deal with the concept of sharing data between large quantities of similar objects stored in memory.
 * 
 * The second is at the DOM layer, where the Flyweight can be used as a central event-manager to avoid attaching
 * event handlers to every child element in a parent container we wish to have some similar behavior.
 */


/**
 * Flyweights and Sharing Data
 * 
 * For this application, there are a few more concepts around the classical Flyweight pattern that we need to be 
 * aware of. In the Flyweight pattern, there’s a concept of two states: intrinsic and extrinsic. Intrinsic 
 * information may be required by internal methods in our objects, which they absolutely cannot function without. 
 * Extrinsic information can however be removed and stored externally.
 * 
 * Objects with the same intrinsic data can be replaced with a single shared object, created by a factory method. 
 * This allows us to reduce the overall quantity of implicit data being stored quite significantly.
 * 
 * The benefit of this is that we’re able to keep an eye on objects that have already been instantiated so that 
 * new copies are only ever created should the intrinsic state differ from the object we already have.
 */

function FlyWeight(make, model, processor) {
    this.make = make,
    this.model = model,
    this.processor = processor
}

const FlyWeightFactory = (function () {
    const flyweight = {};

    return {
        get: function (make, model, processor) {
            if (!flyweight[make + model]) {
                flyweight[make + model] = new FlyWeight(make, model, processor);
            }

            return flyweight[make + model];
        },

        getCount: function () {
            let count = 0;

            for (i in flyweight) count++;
            return count;
        }
    }
})();

function ComputerCollection() {
    let computers = {};
    let count = 0;

    return {
        add: function (make, model, processor, memory, tag) {
            computers[tag] =
                new Computer(make, model, processor, memory, tag);
            count++;
        },

        get: function (tag) {
            return computers[tag];
        },
        getCount: function () {
            return count;
        }
    };
}


function Computer(make, model, processor, memory, tag) {
    this.flyweight = FlyWeightFactory.get(make, model, processor);
    this.memory = memory;
    this.tag = tag;

    getMake = function () {
        return this.flyweight.make;
    }
}

// log helper

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

function run() {
    const computers = new ComputerCollection();

    computers.add("Dell", "Studio XPS", "Intel", "5G", "Y755P");
    computers.add("Dell", "Studio XPS", "Intel", "6G", "X997T");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "U8U80");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "NT777");
    computers.add("Dell", "Studio XPS", "Intel", "2G", "0J88A");
    computers.add("HP", "Envy", "Intel", "4G", "CNU883701");
    computers.add("HP", "Envy", "Intel", "2G", "TXU003283");

    log.add("Computers: " + computers.getCount());
    log.add("Flyweights: " + FlyWeightFactory.getCount());
    log.show();
}

run();