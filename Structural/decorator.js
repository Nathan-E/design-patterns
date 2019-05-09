  /**
 * Decorators are a structural design pattern that aim to promote code reuse. Similar to Mixins, 
 * they can be considered another viable alternative to object subclassing.
 * 
 * Classically, Decorators offered the ability to add behavior to existing classes in a system 
 * dynamically. The idea was that the decoration itself wasn’t essential to the base functionality 
 * of the class; otherwise, it would be baked into the superclass itself.
 * 
 * They can be used to modify existing systems where we wish to add additional features to objects 
 * without the need to heavily modify the underlying code using them. A common reason why developers 
 * use them is that their applications may contain features requiring a large quantity of distinct 
 * types of object. Imagine having to define hundreds of different object constructors for, say, 
 * a JavaScript game
 * 
 * The Decorator pattern isn’t heavily tied to how objects are created but instead focuses on the 
 * problem of extending their functionality. Rather than just relying on prototypal inheritance, 
 * we work with a single base object and progressively add decorator objects that provide the additional 
 * capabilities. The idea is that rather than subclassing, we add (decorate) properties or methods 
 * to a base object so it’s a little more streamlined.
 * 
 * Adding new attributes to objects in JavaScript is a very straightforward process, so with this 
 * in mind, a very simplistic decorator may be implemented as follows 
 */

/**
 * The Decorator pattern extends (decorates) an object’s behavior dynamically. The ability to add 
 * new behavior at runtime is accomplished by a Decorator object which ‘wraps itself’ around the 
 * original object. Multiple decorators can add or override functionality to the original object.
 * 
 * An example of a decorator is security management where business objects are given additional 
 * access to privileged information depending on the privileges of the authenticated user. For 
 * example, an HR manager gets to work with an employee object that has appended 
 * (i.e. is decorated with) the employee's salary record so that salary information can be viewed.
 * 
 * Decorators provide flexibility to statically typed languages by allowing runtime changes as opposed 
 * to inheritance which takes place at compile time. JavaScript, however, is a dynamic language and the 
 * ability to extend an object at runtime is baked into the language itself.
 */

//Example ONE

const User = function(name) {
    this.name = name;
 
    this.say = function() {
        log.add("User: " + this.name);
    };
}
 
const DecoratedUser = function(user, street, city) {
    this.user = user;
    this.name = user.name;  // ensures interface stays the same
    this.street = street;
    this.city = city;
 
    this.say = function() {
        log.add("Decorated User: " + this.name + ", " +
                   this.street + ", " + this.city);
    };
}
 
// logging helper
 
const log = (function() {
    let log = "";
 
    return {
        add: function(msg) { log += msg + "\n"; },
        show: function() { console.log(log); log = ""; }
    }
})();
 
function run() {
 
    const user = new User("Kelly");
    user.say();
 
    const decorated = new DecoratedUser(user, "Broadway", "New York");
    decorated.say();
 
    log.show();
}

run();

//Example TWO

// The constructor to decorate
function MacBook() { 

  this.cost = function () { return 997; }; 
  this.screenSize = function () { return 11.6; }; 

} 

// Decorator 1
function Memory( macbook ) { 

  const v = macbook.cost(); 
  macbook.cost = function() { 
    return v + 75; 
  }; 

} 

// Decorator 2
function Engraving( macbook ){

  const v = macbook.cost(); 
  macbook.cost = function(){
    return  v + 200;
  };

}
 
// Decorator 3
function Insurance( macbook ){

  const v = macbook.cost(); 
  macbook.cost = function(){
     return  v + 250;
  };

}

const mb = new MacBook(); 
Memory( mb ); 
Engraving( mb );
Insurance( mb );

// Outputs: 1522
console.log( mb.cost() );

// Outputs: 11.6
console.log( mb.screenSize() );