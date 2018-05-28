const debug = require("debug")("{{moduleName}}:index");
const {{schemaName}} = require("./model/{{entityModelFileName}}")
  .schema;
const {{schemaCollection}} = require("./db/{{dbEntityFileName}}");
const validate = require("jsonschema")
  .validate;

module.exports.validate = ({{camelCaseEntity}}Object) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate({{camelCaseEntity}}Object, {{schemaName}});
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

// All validations must be performed before we save the object here
// Once the db layer is called its is assumed the object is valid.
module.exports.save = ({{camelCaseEntity}}Object) => {
  return new Promise((resolve, reject) => {
    try {

      if(typeof {{camelCaseEntity}}Object === 'undefined' || {{camelCaseEntity}}Object == null) {
         throw new Error("IllegalArgumentException: {{camelCaseEntity}}Object is null or undefined");
      }
      var res = validate({{camelCaseEntity}}Object, {{schemaName}});
      debug("validation status: ", JSON.stringify(res));
      if(!res.valid) {
        reject(res.errors);
      }
      // Other validations here


      // if the object is valid, save the object to the database
      {{schemaCollection}}.save({{camelCaseEntity}}Object).then((result) => {
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

// List all the objects in the database
// makes sense to return on a limited number
// (what if there are 1000000 records in the collection)
module.exports.getAll = (limit) => {
  return new Promise((resolve, reject) => {
    try {

      if (typeof(limit) == "undefined" || limit == null) {
        throw new Error("IllegalArgumentException: limit is null or undefined");
      }

      {{schemaCollection}}.findAll(limit).then((docs) => {
        debug(`{{camelCaseEntity}}(s) stored in the database are ${docs}`);
        resolve(docs);
      }).catch((e) => {
        debug(`failed to find all the {{entity}}(s) ${e}`);
        reject(e);
      });
    } catch (e) {
      debug(`caught exception ${e}`);
      reject(e);
    }
  });
};


// Get the entity idenfied by the id parameter
module.exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    try {

      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }

      {{schemaCollection}}.findById(id)
        .then((res) => {
          if (res) {
            debug(`{{camelCaseEntity}} found by id ${id} is ${res}`);
            resolve(res);
          } else {
            // return empty object in place of null
            debug(`no {{camelCaseEntity}} found by this id ${id}`);
            resolve({});
          }
        }).catch((e) => {
          debug(`failed to find {{camelCaseEntity}} ${e}`);
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
      if (attribute == null || value == null || typeof attribute === 'undefined' || typeof value === 'undefined') {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }
      {{schemaCollection}}.findOne(attribute,value).then((data)=> {
        if (data) {
          debug(`{{camelCaseEntity}} found ${data}`);
          resolve(data);
        } else {
          // return empty object in place of null
          debug(`no {{camelCaseEntity}} found by this ${attribute} ${value}`);
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
