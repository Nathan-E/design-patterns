/**
 * The purpose of a factory is to abstract the details of object creation from object 
 * use and it is particularly useful when the object creation process is relatively complex.
 * 
 * In the classical definition of the factory pattern, we have three actors involved:
 *  The client: This is the object that needs another object of a specific category 
 *  The factory: This is the object able to generate objects of a number of categories 
 *  The product: This is the object created by the factory and returned to the client
 *
 * There are situations however, where the client does not, or should not, know which 
 * one of several candidate objects to instantiate. The Factory Method allows the client 
 * to delegate object creation while still retaining control over which type to instantiate.
 * 
 * The key objective of the Factory Method is EXTENSIBILITY. Factory Methods are frequently 
 * used in applications that manage, maintain, or manipulate collections of objects that are 
 * different but at the same time have many characteristics (i.e. methods and properties) in common.
 * 
 * 

 */

class Developer {
  constructor(skills, benefits) {
    this.skills = ['JS'].concat(skills);
    this.salary = 90000;
    this.benefits = ['MacBook PRO'].concat(benefits);
  }
}
class Salesman {
  constructor(skills, benefits) {
    this.skills = ["selling"].concat(skills);
    this.salary = 50000;
    this.benefits = ["computer"].concat(benefits);
  }
}
class BusinessAnalyst {
  constructor(skills, benefits) {
    this.skills = ["analyzing"].concat(skills);
    this.salary = 60000;
    this.benefits = ["computer"].concat(benefits);
  }
}

/**
 * Factory with Constructor Registration...
 * With this, we do not need to modify the RecruitmentAgency class, when 
 * new role are added... 
 * 
 * We did better by decoupling the factory from the concrete object creator functions.
 * 
 * My Observation
 * The above code can be reused anywhere!!!...
 * its totally decoupled from the concerte object constructor function
 * This function can be reusable in any other suituation requiring a factory

 */

 // IMPLEMENTATION TWO
class RecruitmentAgency {
  constructor() {
    this.objConstructors = {};
  }

  //Registers the new job role
  register(role, constructor) {
    this.objConstructors[role] = constructor;
  }

  //Returns the constructor required based on th e role
  getStaffMember(role, skills, benefits) {
    const objConstructor = this.objConstructors[role];

    let member;

    if (objConstructor) member = new objConstructor(skills, benefits);

    return member;
  }
}

const agency = new RecruitmentAgency();
agency.register("dev", Developer);
agency.register("ba", BusinessAnalyst);
agency.register("sale", Salesman);

const Dare = agency.getStaffMember('dev', 'Node JS', ['Beats by Darey']);

console.log(Dare.benefits);
console.log(Dare.skills);
console.log(Dare.salary);


/**  IMPLEMTATION TWO
 * The implementation of the factory we have just shown is the most simple and intuitive. 
 * However, it has a main drawback: when we need to add a new role we should modify the 
 * RecruitmentAgency class. 
 * It may be acceptable in situations where these changes happen very seldomly, 
 * 
 * My Observation...
 * This Factory is tightly coupled to the concrete object constructor function...
 * This code snippet is not reusable in any other suituation requiring a factory
 */
class RecruitmentAgency1 {
  getStaffMember(role, skills, benefits) {
    let member;
    switch (role.toLowerCase()) {
      case "dev":
        member = new Developer(skills, benefits);
        break;
      case "sale":
        member = new Salesman(skills, benefits);
        break;
      case "ba":
        member = new BusinessAnalyst(skills, benefits);
        break;
      default:
        throw new Error("Unable to hire people for the role " + role)
    }
    return member;
  }
}

const agency1 = new RecruitmentAgency1();
const newDevStaffMember = agency1.getStaffMember("dev", ["C++",  "C#"], ["tablet"]);

console.log(newDevStaffMember.benefits);
console.log(newDevStaffMember.skills);
console.log(newDevStaffMember.salary);





