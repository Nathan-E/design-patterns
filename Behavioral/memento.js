/**
 * The memento pattern is a software design pattern that provides the ability to restore an object to its
 * previous state (undo via rollback).
 * 
 * The memento pattern is implemented with three objects: the originator, a caretaker and a memento. The 
 * originator is some object that has an internal state. The caretaker is going to do something to the 
 * originator, but wants to be able to undo the change. The caretaker first asks the originator for a 
 * memento object. Then it does whatever operation (or sequence of operations) it was going to do. To roll 
 * back to the state before the operations, it returns the memento object to the originator. The memento 
 * object itself is an opaque object (one which the caretaker cannot, or should not, change). When using 
 * this pattern, care should be taken if the originator may change other objects or resources - the memento 
 * pattern operates on a single object.
 */

 /**
  * The Memento pattern provides temporary storage as well as restoration of an object. The mechanism in 
  * which you store the object’s state depends on the required duration of persistence, which may vary.
  * 
  * You could view a database as an implementation of the Memento design pattern in which objects are 
  * persisted and restored. However, the most common reason for using this pattern is to capture a snapshot
  *  of an object’s state so that any subsequent changes can be undone easily if necessary.
  * 
  * Essentially, a Memento is a small repository that stores an object’s state. Scenarios in which you may 
  * want to restore an object into a state that existed previously include: saving and restoring the state 
  * of a player in a computer game or the implementation of an undo operation in a database.
  * 
  * In JavaScript Mementos are easily implemented by serializing and de-serializing objects with JSON.
  */

/**
 * What problems can the Memento design pattern solve?
 * 
 *    The internal state of an object should be saved externally so that the object can be restored to this state later.
 *    The object's encapsulation must not be violated.
 * 
 * The problem is that a well designed object is encapsulated so that its representation (data structure) 
 * is hidden inside the object and can't be accessed from outside the object.
 * 
 * What solution does the Memento design pattern describe?
 * 
 *  Make an object (originator) itself responsible for\
 *    saving its internal state to a (memento) object and
 *    restoring to a previous state from a (memento) object.
 * 
 * Only the originator that created a memento is allowed to access it.
 * 
 * A client (caretaker) can request a memento from the originator (to save the internal state of the originator) 
 * and pass a memento back to the originator (to restore to a previous state). 
 * This enables to save and restore the internal state of an originator without violating its encapsulation.
 */

const Person = function (name, street, city, state) {
  this.name = name;
  this.street = street;
  this.city = city;
  this.state = state;
}

Person.prototype = {

  serialize: function(){
    const memento = JSON.stringify(this);
    return memento;
  },

  deserialize: function(memento){
    const m = JSON.parse(memento);
    this.name = m.name;
    this.street = m.street;
    this.city = m.city;
    this.state = m.state;
  }
}

const CareTaker = function () {
  this.mementos = {};

  this.add = (key, memento) => {
      this.mementos[key] = memento;
    },

    this.get = (key) => {
      return this.mementos[key];
    }
}

const log = (function () {
  let log = '';

  return {
    add: (msg) => {
      log += msg + '\n'
    },
    show: () => {
      console.log(log), log = ''
    }
  };
})();

function run() {
  const mike = new Person("Mike Foley", "1112 Main", "Dallas", "TX");
  const john = new Person("John Wang", "48th Street", "San Jose", "CA");
  const caretaker = new CareTaker();

  // save state

  caretaker.add(1, mike.serialize());
  caretaker.add(2, john.serialize());

  // mess up their names

  mike.name = "King Kong";
  john.name = "Superman";

  // restore original state

  mike.deserialize(caretaker.get(1));
  john.deserialize(caretaker.get(2));

  log.add(mike.name);
  log.add(john.name);

  log.show();
}

run();