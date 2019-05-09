/**
 * In object-oriented programming, the command pattern is a behavioral design pattern in which an 
 * object is used to encapsulate all information needed to perform an action or trigger an event 
 * at a later time. This information includes the method name, the object that owns the method and 
 * values for the method parameters.
 * 
 * Four terms always associated with the command pattern are command, receiver, invoker and client. 
 * A command object knows about receiver and invokes a method of the receiver. Values for parameters 
 * of the receiver method are stored in the command. The receiver object to execute these methods is 
 * also stored in the command object by aggregation. The receiver then does the work when the execute() 
 * method in command is called. An invoker object knows how to execute a command, and optionally does 
 * bookkeeping about the command execution. The invoker does not know anything about a concrete command, 
 * it knows only about the command interface. Invoker object(s), command objects and receiver objects are 
 * held by a client object, the client decides which receiver objects it assigns to the command objects, 
 * and which commands it assigns to the invoker. The client decides which commands to execute at which points. 
 * To execute a command, it passes the command object to the invoker object.
 * 
 * Using command objects makes it easier to construct general components that need to delegate, sequence or 
 * execute method calls at a time of their choosing without the need to know the class of the method or the 
 * method parameters. Using an invoker object allows bookkeeping about command executions to be conveniently 
 * performed, as well as implementing different modes for commands, which are managed by the invoker object, 
 * without the need for the client to be aware of the existence of bookkeeping or modes.
 */

/**
 * The Command pattern encapsulates actions as objects. Command objects allow for loosely coupled systems by 
 * separating the objects that issue a request from the objects that actually process the request. These requests 
 * are called events and the code that processes the requests are called event handlers.
 * 
 * Suppose you are building an application that supports the Cut, Copy, and Paste clipboard actions. These actions 
 * can be triggered in different ways throughout the app: by a menu system, a context menu (e.g. by right clicking 
 * on a textbox), or by a keyboard shortcut.
 * 
 * Command objects allow you to centralize the processing of these actions, one for each operation. So, you need 
 * only one Command for processing all Cut requests, one for all Copy requests, and one for all Paste requests.
 * 
 * Because commands centralize all processing, they are also frequently involved in handling Undo functionality for 
 * the entire application.
 */

/**
 * What problems can the Command design pattern solve?
 * 
 * Coupling the invoker of a request to a particular request should be avoided. That is, hard-wired requests should be avoided.
 * It should be possible to configure an object (that invokes a request) with a request.
 * 
 * Implementing (hard-wiring) a request directly into a class is inflexible because it couples the class to a 
 * particular request at compile-time, which makes it impossible to specify a request at run-time.
 * 
 * What solution does the Command design pattern describe?
 * 
 * Define separate (command) objects that encapsulate a request.
 * A class delegates a request to a command object instead of implementing a particular request directly.
 * 
 * This enables one to configure a class with a command object that is used to perform a request. The class is no longer coupled to a particular request and has no knowledge (is independent) of how the request is carried out.
 */

function add(x, y) {
  return x + y;
}

function sub(x, y) {
  return x - y;
}

function mul(x, y) {
  return x * y;
}

function div(x, y) {
  return x / y;
}

const Command = function (execute, undo, value) {
  this.execute = execute;
  this.undo = undo;
  this.value = value;
}

const AddCommand = function (value) {
  return new Command(add, sub, value);
};

const SubCommand = function (value) {
  return new Command(sub, add, value);
};

const MulCommand = function (value) {
  return new Command(mul, div, value);
};

const DivCommand = function (value) {
  return new Command(div, mul, value);
};

const Calculator = function () {
  let current = 0;
  const commands = [];

  function action(command) {
    const name = command.execute.toString().substr(9, 3);
    return name.charAt(0).toUpperCase() + name.slice(1);
  }

  return {
    execute: function (command) {
      current = command.execute(current, command.value);
      commands.push(command);
      log.add(action(command) + ": " + command.value);
    },

    undo: function () {
      const command = commands.pop();
      current = command.undo(current, command.value);
      log.add("Undo " + action(command) + ": " + command.value);
    },

    getCurrentValue: function () {
      return current;
    }
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
  const calculator = new Calculator();

  // issue commands

  calculator.execute(new AddCommand(100));
  calculator.execute(new SubCommand(24));
  calculator.execute(new MulCommand(6));
  calculator.execute(new DivCommand(2));

  // reverse last two commands

  calculator.undo();
  calculator.undo();

  log.add("\nValue: " + calculator.getCurrentValue());
  log.show();
}

run();