 /**
  * The State pattern provides state-specific logic to a limited set of objects in which each object 
  * represents a particular state. This is best explained with an example.
  * 
  * Say a customer places an online order for a TV. While this order is being processed it can in one 
  * of many states: New, Approved, Packed, Pending, Hold, Shipping, Completed, or Canceled. If all goes 
  * well the sequence will be New, Approved, Packed, Shipped, and Completed. However, at any point 
  * something unpredictable may happen, such as no inventory, breakage, or customer cancelation. 
  * If that happens the order needs to be handled appropriately.
  * 
  * Applying the State pattern to this scenario will provide you with 8 State objects, each with its own
  *  set of properties (state) and methods (i.e. the rules of acceptable state transitions). State machines
  *  are often implemented using the State pattern. These state machines simply have their State objects 
  * swapped out with another one when a state transition takes place.
  * 
  * Two other examples where the State pattern is useful include: vending machines that dispense products 
  * when a correct combination of coins is entered, and elevator logic which moves riders up or down 
  * depending on certain complex rules that attempt to minimize wait and ride times.
  * 
  */

 /**
  * The state pattern is set to solve two main problems:
  * 
  * An object should change its behavior when its internal state changes.
  * State-specific behavior should be defined independently. That is, adding new states should not affect the 
  * behavior of existing states.
  * 
  * Implementing state-specific behavior directly within a class is inflexible because it commits the class 
  * to a particular behavior and makes it impossible to add a new state or change the behavior of an 
  * existing state later independently from (without changing) the class. In this, the pattern describes two solutions:
  * 
  * Define separate (state) objects that encapsulate state-specific behavior for each state. That is, define 
  * an interface (state) for performing state-specific behavior, and define classes that implement the interface for each state.
  * A class delegates state-specific behavior to its current state object instead of implementing state-specific behavior directly.
  * 
  * This makes a class independent of how state-specific behavior is implemented. New states can be added by defining 
  * new state classes. A class can change its behavior at run-time by changing its current state object.
  */
 //
  const fs = require('fs');

function Factory(chain) {
  this.initailState = function (type) {
  if (type === "Producer") {
      return new Producer(chain);
  } else if (type === "Retailer") {
      return new Retailer(chain);
  } else if (type === "Consumer") {
      return new Consumer(x);
  } else if (type === "Retailer") {
      return new Retailer(chain);
  }
}
}

console.log(new Factory().initailState('Producer'))

 const ProductLifeCycler = function (product, initail = 'Producer') {
   //execution begins 
   let currentState = new Factory(this).initailState(initail);

   this.changeState = function (state) {
     currentState = state;
     currentState.flowChannel(product);
   };

   //start the changeState of state
   this.start = function () {
     currentState.flowChannel(product);
   };
 }

function Producer (state) {

   this.flowChannel = function (product) {
     data = `Channelling ${product} from the Producer to the Retailer`;
     //chains the next state
     fs.appendFileSync('result.txt', `${data}\n`);
     console.log(this);
     state.changeState(new Retailer(state));
   }
 };

function Retailer(state) {

   this.flowChannel = function (product) {
     data = `Channelling ${product} from the Retailer to the Consumer`;
     //chains the next state
     fs.appendFileSync('result.txt', `${data}\n`);
     console.log(this);
     state.changeState(new Consumer(state));
   }

 };

 function Consumer(state) {

   this.flowChannel = function (product) {
     data = `Channelling ${product} from the Consumer to the Recycler`;
     //chains the next state
     fs.appendFileSync('result.txt', `${data}\n`);
     console.log(this);
     state.changeState(new Recycler(state));
   }

 };

 function Recycler() {

   this.flowChannel = function (product) {
     data = `Channelling recycled ${product} from the Recycler to the Producer`;
     //chains the next state
     fs.appendFileSync('result.txt', `${data}\n`);
     console.log(this);
   }

 };


 function run() {
   const state = new ProductLifeCycler('product');
   state.start();
 }

 run();