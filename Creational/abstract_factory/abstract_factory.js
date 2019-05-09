/**
 * The Abstract factory is an evolution of the factory pattern.
 * This pattern builds on the factory pattern, it returns
 * a factory instead of an object.
 * 
 * It is nicknamed: Factory of Factories.
 * 
 * In the classical definition of the factory pattern, we have three actors involved:
 * The client: As in the factory pattern, this is the object that needs another object of a specific category
 * The abstract factory: This is the object that returns a concrete factory
 * The concrete factory: It is the factory returned by the abstract factory able to
 *                       create objects of a number of categories
 * The product: This is the object created by the concrete factory and used by the client
 */

/**
 * In order to explain how this pattern works, let's modify our example of the recruiting 
 * agency considering a case where we have more AGENCIES, each one specialized in recruiting 
 * staff members in a SPECIFIC AREA, such as development, sales, and so on. Inside each AREA, 
 * they can detect and hire people with SPECIFIC skills, for example JavaScript, C#, or SQL 
 * skills for the development area.
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

//Abstract Factory
class RecruitmentAgencyAbstractFactory {
  constructor() {
    this.agencyFactories = {};
  }
  // The register() method allows an agency factory to be registered
  // on the agencyFactories property with a specific area code.
  register(area, agencyFactory) {
    this.agencyFactories[area] = agencyFactory;
  }
  // The getAgency() method returns the factory identified   
  // by the area code passed as a parameter.
  getAgency(area) {
    return new this.agencyFactories[area];
  }
}

//Each concrete factory will be focused on returning specialized staff members. 

class DevAgency {
  getStaffMember(skills, benefits) {
    return new Developer(skills, benefits);
  }
}

class SalesAgency {
  getStaffMember(skills, benefits) {
    return new Salesman(skills, benefits);
  }
}

class BusinessAnalystAgency {
  getStaffMember(skills, benefits) {
    return new BusinessAnalyst(skills, benefits);
  }
}

//The registration of the agency factories to the abstract factory:
const agencyFinder = new RecruitmentAgencyAbstractFactory();
agencyFinder.register("dev", DevAgency);
agencyFinder.register("sales", SalesAgency);
agencyFinder.register("ba", BusinessAnalystAgency);


const devAgency = agencyFinder.getAgency('dev');
const Dare = devAgency.getStaffMember(['React JS'], ['Vacation']);

console.log(Dare.skills);
console.log(Dare.salary);
console.log(Dare.benefits);

