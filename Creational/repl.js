// // // const id = (function* IdGen() {
// // //   let x = 0;
// // //   while (x < 4) yield ++x;
// // // })();



// // // // const inst = IdGen();

// // // // console.log(id.next());
// // // // console.log(id.next());
// // // // console.log(id.next());
// // // // console.log(id.next());
// // // // console.log(id.next().done);

// // // class check{
// // //     constructor(hey) {
// // //       this.instance;
// // //       this.hey = hey;

// // //       this.start = () => {
// // //         console.log('Hey ' + hey);
// // //       }

// // //       // if (!this.instance) return this.instance = this;
// // //       // return this.instance;
// // //     }
// // //     start() {
// // //       console.log(this.hey);
// // //     }
// // //   }


// // // const b = new check('Dare');

// // // const a = new check('Grace');


// // // console.log(a);
// // // console.log(a.hey);
// // // a.start();
// // // console.log(a === b);


// // class Producer{
// //   constructor(){
// //     this.name = 'Producer';
// //     return new Retailer;
// //   }
// // }

// // class Retailer {
// //   constructor() {
// //     this.name = 'Retailer';
// //     return new Consumer;
// //   }
// // }

// // class Consumer {
// //   constructor() {
// //     this.name = 'Consumer';
// //     return new Recycler;
// //   }
// // }

// // class Recycler {
// //   constructor() {
// //     this.name = 'Recycler';
// //     return new Producer;
// //   }
// // }

// // class ProductCycler{
// //   constructor(product, state){
// //     this.product = product;
// //     this.currentState = state;
// //   }
// //   start(){
// //     this.currentState
// //   }
// // }

// // function run(product, state){
// //   const pr = new ProductCycler(product, state);

// //   pr.start();
// // }

// class check{
//   constructor(name, age){
//     this.surname = 'Frank';
//     // this.age = age || 18;
//     this.name = name;
//     this.fullname = () => {
//       console.log(surname);
//     }
//   }

//   get firstname(){
//     return this.name;
//   }
// }

// const eg = new check('Grace');

// console.log(eg.surname);

// function check1(){
//   let a = 8888;
//   this.name;

//   Object.defineProperty(this, 'j', {
//     get: function(){
//       return a;
//     }
//   })

// }
//  let ttt = new check1();


//  console.log(ttt.a);

//  const promise = new Promise(function (resolve, reject) {
//    setTimeout(() => {
//      resolve([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
//    }, 0);
//  });

//  function onlyEvenNumbers(array) {
//    return array.filter((value) => {
//      return (value % 2) === 0;
//    });
//  }

//  function sumOfArray(array) {
//    return array.reduce((a, b) => {
//      return a + b;
//    }, 0);
//  }

//  function logPlease(value) {
//    console.log(value);
//    return value;
//  }

//  function errorHandler(err) {
//    console.log("ERROR");
//    console.log(err);
//  }

// //  promise
// //    .then(logPlease)
// //    .then(onlyEvenNumbers)
// //    .then(logPlease)
// //    .then(sumOfArray)
// //    .then(logPlease)
// //    .catch(errorHandler);

// class xz{
//   constructor(x, y){
//     this.x = x;
//     this.y = y;
//   }
//   get(){
//     console.log(this.x);
//   }
//   get para2(){
//     console.log(this.y);
//   }
// }

// const inst = new xz;

// console(inst(5).get())

class StateFactory {
  constructor() {
    this.stateFactories = {};

    // The register() method allows an agency factory to be registered
    // on the agencyFactories property with a specific area code.
  
  this.register = (state, stateFactory) =>{
    this.stateFactories[state] = stateFactory;
  }
  }
  // The getAgency() method returns the factory identified   
  // by the area code passed as a parameter.
  getAgency(state, stateFactory) {
    if (!this.stateFactories[state]) {
      this.register(state, stateFactory);
    }
    return new this.stateFactories[state];
  }
}


const eg = new StateFactory;

function check() {
  console.log('Hello World');
}
// function check(){
//   console.log('Hi');
// }

eg.getAgency('damn', check);
eg.getAgency('damn');