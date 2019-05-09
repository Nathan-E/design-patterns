/**
 * The Bridge pattern allows two components, a client and a service, to work together with each component 
 * having its own interface. Bridge is a high-level architectural pattern and its main goal is to write 
 * better code through two levels of abstraction. It facilitates very loose coupling of objects. It is 
 * sometimes referred to as a double Adapter pattern.
 * 
 * An example of the Bridge pattern is an application (the client) and a database driver (the service). The 
 * application writes to a well-defined database API, for example ODBC, but behind this API you will find 
 * that each driver's implementation is totally different for each database vendor (SQL Server, MySQL, Oracle, etc.).
 */

/**
 * The objective of the example is to show that with the Bridge pattern input and output devices can 
 * vary independently (without changes to the code); the devices are loosely coupled by two levels of abstraction.
 * 
 * JavaScript does not support abstract classes therefore Abstraction and Implementor are not included. However, 
 * their interfaces (properties and methods) are consistently implemented in RefinedAbstraction and ConcreteImplementor. 
 * In our example code the Abstraction represents Input devices and the Implementor represents Output devices.
 * 
 * Gestures (finger movements) and the Mouse are very different input devices, but their actions map to a common 
 * set of output instructions: click, move, drag, etc. Screen and Audio are very different output devices, but 
 * they respond to the same set of instructions. Of course, the effects are totally different, that is, video 
 * updates vs. sound effects. The Bridge pattern allows any input device to work with any output device.
 */

/**
 * The bridge pattern is a design pattern used in software engineering that is meant to "decouple an abstraction 
 * from its implementation so that the two can vary independently", introduced by the Gang of Four. The bridge 
 * uses encapsulation, aggregation, and can use inheritance to separate responsibilities into different classes.
 * 
 * When a class varies often, the features of object-oriented programming become very useful because changes to a 
 * program's code can be made easily with minimal prior knowledge about the program. The bridge pattern is useful 
 * when both the class and what it does vary often. The class itself can be thought of as the abstraction and what 
 * the class can do as the implementation. The bridge pattern can also be thought of as two layers of abstraction.
 */

// input devices
const Gestures = function (output) {
  this.output = output;

  this.tap = function () {
    this.output.click()
  };
  this.swipe = function () {
    this.output.move()
  };
  this.pan = function () {
    this.output.drag()
  };
  this.pinch = function () {
    this.output.zoom()
  };
}

const Mouse = function (output) {
  this.output = output;

  this.click = function () {
    this.output.click()
  };
  this.move = function () {
    this.output.move()
  };
  this.down = function () {
    this.output.drag()
  };
  this.wheel = function () {
    this.output.zoom()
  };
}

// output devices

const Screen = function () {
  this.click = function () {
    log.add('Screen selected');
  }
  this.move = function () {
    log.add('Screen move');
  }
  this.drag = function () {
    log.add('Screen drag');
  }
  this.zoom = function () {
    log.add('Screen zoom in');
  }
}

const Audio = function () {
  this.click = function () {
    log.add('Sound oink');
  }
  this.move = function () {
    log.add('Sound waves');
  }
  this.drag = function () {
    log.add('Sound screetch');
  }
  this.zoom = function () {
    log.add('Sound volume up');
  }
}

//logging helper
const log = (function () {
  let log = '';

  return {
    add: function (msg) {
      log += msg + '\n';
    },
    show: function () {
      console.log(log);
      log = '';
    }

  }
})();

function run (){
  const screen = new Screen();
  const audio = new Audio();

  const hand = new Gestures(screen);
  const mouse = new Mouse(audio);

  hand.tap();
  hand.swipe();
  hand.pinch();

  mouse.click();
  mouse.move();
  mouse.wheel();

  log.show();
}

run();