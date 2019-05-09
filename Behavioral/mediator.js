/**
 * In software engineering, the mediator pattern defines an object that encapsulates how a 
 * set of objects interact. This pattern is considered to be a behavioral pattern due to the way 
 * it can alter the program's running behavior.
 * 
 * Usually a program is made up of a large number of classes. Logic and computation are distributed 
 * among these classes. However, as more classes are added to a program, especially during maintenance 
 * and/or refactoring, the problem of communication between these classes may become more complex. 
 * This makes the program harder to read and maintain. Furthermore, it can become difficult to change 
 * the program, since any change may affect code in several other classes.
 * 
 * With the mediator pattern, communication between objects is encapsulated within a mediator object. 
 * Objects no longer communicate directly with each other, but instead communicate through the mediator. 
 * This reduces the dependencies between communicating objects, thereby reducing coupling.
 */

/**
 * The Mediator pattern provides central authority over a group of objects by encapsulating how these objects 
 * interact. This model is useful for scenarios where there is a need to manage complex conditions in which 
 * every object is aware of any state change in any other object in the group.
 * 
 * The Mediator patterns are useful in the development of complex forms. Take for example a page in which you 
 * enter options to make a flight reservation. A simple Mediator rule would be: you must enter a valid departure 
 * date, a valid return date, the return date must be after the departure date, a valid departure airport, a 
 * valid arrival airport, a valid number of travelers, and only then the Search button can be activated.
 */

/**
 * What problems can the Mediator design pattern solve? 
 *    Tight coupling between a set of interacting objects should be avoided.
 *    It should be possible to change the interaction between a set of objects independently.\
 * 
 *  Defining a set of interacting objects by accessing and updating each other directly is inflexible because it 
 * tightly couples the objects to each other and makes it impossible to change the interaction independently from 
 * (without having to change) the objects. And it stops the objects from being reusable and makes them hard to test. 
 * Tightly coupled objects are hard to implement, change, test, and reuse because they refer to and know about many 
 * different objects.
 * 
 * What solution does the Mediator design pattern describe?
 *    Define a separate (mediator) object that encapsulates the interaction between a set of objects.
 *    Objects delegate their interaction to a mediator object instead of interacting with each other directly.
 * 
 * The objects interact with each other indirectly through a mediator object that controls and coordinates the interaction. 
 * This makes the objects loosely coupled. They only refer to and know about their mediator object and have no 
 * explicit knowledge of each other.
 */

const Participant = function (name) {
  this.name = name;
  this.chatroom = null;
}

Participant.prototype = {
  send: function (message, to) {
    this.chatroom.send(message, this, to);
  },
  receive: function (message, from) {
    log.add(from.name + ' to ' + this.name + ': ' + message);
  }
}

const Chatroom = function () {
  const participants = {};

  return {
    register: function (participant) {
      participants[participant.name] = participant;
      participant.chatroom = this;
    },

    send: function (message, from, to) {
      if (to) {
        to.receive(message, from);
      } else {
        for (key in participants) {
          if (participants[key] !== from) {
            participants[key].receive(message, from);
          }
        }
      }
    }
  };
};

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
  };
})();

function run () {
  const yoko = new Participant('Yoko');
  const john = new Participant("John");
  const paul = new Participant("Paul");
  const ringo = new Participant("Ringo");

  const chatroom = new Chatroom();
  chatroom.register(yoko);
  chatroom.register(john);
  chatroom.register(paul);
  chatroom.register(ringo);

  yoko.send("All you need is love.");
  yoko.send("I love you John.");
  john.send("Hey, no need to broadcast", yoko);
  paul.send("Ha, I heard that!");
  ringo.send("Paul, what do you think?", paul);

  log.show();
}

run();