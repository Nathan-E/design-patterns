/**
 * Define a family of algorithms, encapsulate each one, and make them interchangeable. Strategy lets 
 * the algorithm vary independently from clients that use it.
 * 
 * The Strategy pattern encapsulates alternative algorithms (or strategies) for a particular task. 
 * It allows a method to be swapped out at runtime by any other method (strategy) without the client 
 * realizing it. Essentially, Strategy is a group of algorithms that are interchangeable.
 * 
 * Say we like to test the performance of different sorting algorithms to an array of numbers: shell 
 * sort, heap sort, bubble sort, quicksort, etc. Applying the Strategy pattern to these algorithms 
 * allows the test program to loop through all algorithms, simply by changing them at runtime and test 
 * each of these against the array. For Strategy to work all method signatures must be the same so that 
 * they can vary without the client program knowing about it.
 */

/**
 * In computer programming, the strategy pattern (also known as the policy pattern) is a behavioral software 
 * design pattern that enables selecting an algorithm at runtime. Instead of implementing a single algorithm 
 * directly, code receives run-time instructions as to which in a family of algorithms to use.
 * 
 * Strategy lets the algorithm vary independently from clients that use it. Strategy is one of the patterns 
 * included in the influential book Design Patterns by Gamma et al that popularized the concept of using 
 * design patterns to describe how to design flexible and reusable object-oriented software. Deferring the 
 * decision about which algorithm to use until runtime allows the calling code to be more flexible and reusable.
 * 
 * For instance, a class that performs validation on incoming data may use the strategy pattern to select a 
 * validation algorithm depending on the type of data, the source of the data, user choice, or other 
 * discriminating factors. These factors are not known until run-time and may require radically different 
 * validation to be performed. The validation algorithms (strategies), encapsulated separately from the validating 
 * object, may be used by other validating objects in different areas of the system (or even different systems) 
 * without code duplication.
 * 
 * Typically the strategy pattern stores a reference to some code in a data structure and retrieves it. This can 
 * be achieved by mechanisms such as the native function pointer, the first-class function, classes or class 
 * instances in object-oriented programming languages, or accessing the language implementation's internal storage 
 * of code via reflection.
 */


const Shipping = function () {
  this.company = "";
};

Shipping.prototype = {
  setStrategy: function (company) {
    this.company = company;
  },

  calculate: function (package) {
    return this.company.calculate(package);
  }
};

const UPS = function () {
  this.calculate = function (package) {
    // calculations...
  const rate = 45.95;
    return `$${rate * package.weigth}`;
  }
};

const USPS = function () {
  this.calculate = function (package) {
  // calculations...
  const rate = 39.40;
    return `$${rate * package.weigth}`;
  }
};

const Fedex = function () {
  this.calculate = function (package) {
    // calculations...
  const rate = 43.20;
    return `$${rate * package.weigth}`;
  }
};

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
  const package = {
    from: "76712",
    to: "10012",
    weigth: 4 //in kg
  };

  // the 3 strategies

  const ups = new UPS();
  const usps = new USPS();
  const fedex = new Fedex();

  const shipping = new Shipping();

  shipping.setStrategy(ups);
  log.add("UPS Strategy: " + shipping.calculate(package));
  shipping.setStrategy(usps);
  log.add("USPS Strategy: " + shipping.calculate(package));
  shipping.setStrategy(fedex);
  log.add("Fedex Strategy: " + shipping.calculate(package));

  log.show();
}

run();