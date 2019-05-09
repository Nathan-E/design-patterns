/**
 * In object-oriented programming and software engineering, the visitor design pattern is a way of 
 * separating an algorithm from an object structure on which it operates. A practical result of this 
 * separation is the ability to add new operations to existent object structures without modifying the 
 * structures. It is one way to follow the open/closed principle.
 * 
 * In essence, the visitor allows adding new virtual functions to a family of classes, without modifying 
 * the classes. Instead, a visitor class is created that implements all of the appropriate specializations 
 * of the virtual function. The visitor takes the instance reference as input, and implements the goal through double dispatch.
 */

/**
 * What problems can the Visitor design pattern solve? 
 * 
 * It should be possible to define a new operation for (some) classes of an object structure without changing the classes.
 * When new operations are needed frequently and the object structure consists of many unrelated classes, 
 * it's inflexible to add new subclasses each time a new operation is required because "[..] distributing all 
 * these operations across the various node classes leads to a system that's hard to understand, maintain, and change." 
 * 
 * What solution does the Visitor design pattern describe?
 * 
 * Define a separate (visitor) object that implements an operation to be performed on elements of an object structure.
 * Clients traverse the object structure and call a dispatching operation accept(visitor) on an element — that 
 * "dispatches" (delegates) the request to the "accepted visitor object". The visitor object then performs the 
 * operation on the element ("visits the element").
 * 
 * This makes it possible to create new operations independently from the classes of an object structure by adding new visitor objects.
 */


const Employee = function (name, salary, vacation) {
  const self = this;

  this.accept = function (visitor) {
    visitor.visit(self);
  };

  this.getName = function () {
    return name;
  };

  this.getSalary = function () {
    return salary;
  };

  this.setSalary = function (sal) {
    salary = sal;
  };

  this.getVacation = function () {
    return vacation;
  };

  this.setVacation = function (vac) {
    vacation = vac;
  };
};

const ExtraSalary = function () {
  this.visit = function (emp) {
    emp.setSalary(emp.getSalary() * 1.1);
  };
};

const ExtraVacation = function () {
  this.visit = function (emp) {
    emp.setVacation(emp.getVacation() + 2);
  };
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

  const employees = [
    new Employee("John", 10000, 10),
    new Employee("Mary", 20000, 21),
    new Employee("Boss", 250000, 51)
  ];

  const visitorSalary = new ExtraSalary();
  const visitorVacation = new ExtraVacation();

  for (let i = 0, len = employees.length; i < len; i++) {
    const emp = employees[i];

    emp.accept(visitorSalary);
    emp.accept(visitorVacation);
    log.add(emp.getName() + ": $" + emp.getSalary() +
      " and " + emp.getVacation() + " vacation days");
  }

  log.show();
}

run();