const debug = require("debug")("{{moduleName}}:db:index");
const {{schemaName}} = require("./model/{{schemaName}}")
  .schema;
const {{entity}} = require("./db/{{entity}}");
const validate = require("jsonschema")
  .validate;

module.exports.validate = ({{entity}}Object) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate({{entity}}Object, {{schemaName}});
      debug("validation status: ", JSON.stringify(res));
      if(res.valid) {
        resolve(res.valid);
      } else {
        reject(res.errors);
      }
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.save = ({{entity}}Object) => {
  return new Promise((resolve, reject) => {
    try {
      {{entity}}.save({{entity}}Object).then((result) => {
        debug(`saved successfully ${result}`);
        resolve(result);
      }).catch((e) => {
        debug(`failed to save with an error: ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      {{entity}}.findAll().then((docs) => {
        debug(`{{entity}}s stored in the database are ${docs}`);
        resolve(docs);
      }).catch((e) => {
        debug(`failed to find all the {{entity}}s ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }
      {{entity}}.findById(id)
        .then((res) => {
          if (res) {
            debug(`{{entity}} found by id ${id} is ${res}`);
            resolve(res);
          } else {
            // return empty object in place of null
            debug(`no {{entity}} found by this id ${id}`);
            resolve({});
          }
        }).catch((e) => {
          debug(`failed to find {{entity}} ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};

module.exports.getOne=(attribute,value)=> {
  return new Promise((resolve,reject)=> {
    try {
      if (attribute == null || value == null) {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }
      {{entity}}.findOne(attribute,value).then((data)=> {
        if (data) {
          debug(`{{entity}} found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no {{entity}} found by this ${attribute} ${value}`);
          resolve({});
        }
      }).catch((e)=> {
        debug(`failed to find ${e}`);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};
