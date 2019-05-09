const ObjectPool = (function () {
  let instance;
  let objConstructor;
  const objPool = [];
  
  return class {
    constructor(objConstr) {
      if (!instance) {
        objConstructor = objConstr;
        instance = this;
      }
      return instance;
    }
    get() {
      let obj;
      if (objPool.length == 0) {
        obj = new objConstructor();
      } else {
        obj = objPool.pop();
      }
      return obj;
    }
    recycle(obj) {
      objPool.push(obj);
    }
  };
})();