/**
 * The Singleton design pattern is used in case where only one instance of an object is needed. Several
 * other patterns (such as factory, prototype, facade pattern) make used of the singleton pattern. 
 * Singletons are important where system-wide actions needs to be coordinate from a single central place.
 * The Singleton pattern reduces the risk of have global variables therfore the namespace collosion is reduced.
 * The Module pattern in Javascript is an implementation of the Singleton Pattern.
 * 
 * Singleton Object is made through LAZY LOAD design pattern.  Lazy Load checks if an instance has already been created, i
 * if not, it creates one and stores it for future reference. All subsequent calls will receive the stored instance. 
 * Lazy loading is a CPU and memory saving technique by creating objects only when absolutely necessary.
 * 
 */

 /**
  * My Observation:
  * 
  * The singleton is mostly wrapped in an IIFE inside the IIFE, 
  * the singleton exist as a class or a constructor function that 
  * returns the instance of the function to the IIFE return statement
  */

// const IdGenerator = (function () {
//   let instance;
//   let counter = 0;
//   const Constructor = function () {
//     if (!instance) {
//       instance = this;
//     }
//     return instance;
//   };
//   Constructor.prototype.newId = function () {
//     return ++counter;
//   };
//   return Constructor;
// })();

const IdGenerator = (function () {
  let instance;
  let counter = 0;
  return class {
    constructor() {
      if (!instance) {
        instance = this;
      }
      return instance;
    };

    newId() {
      return ++counter;
    };
  }
})();

const gen1 = new IdGenerator();
console.log(gen1.newId());
console.log(gen1.newId());

const gen2 = new IdGenerator();
console.log(gen2.newId());

console.log(gen1 === gen2);


//Example two
const check = (function() {
  let instance;

  function createInstance() {
    const object = new Object("I am the instance");
    return object;
  }
  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      };
      return instance;

    }
  }
})();

let x = check;
let y = check;

console.log(x.getInstance() === y.getInstance());