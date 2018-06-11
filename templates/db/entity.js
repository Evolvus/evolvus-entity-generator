const debug = require("debug")("{{moduleName}}:db:{{dbEntityFileName}}");
const mongoose = require("mongoose");
const ObjectId = require('mongodb')
  .ObjectID;

const {{schemaName}} = require("./{{dbSchemaFileName}}");

// Creates a {{schemaCollection}} collection in the database
var {{schemaCollection}} = mongoose.model("{{schemaCollection}}", {{schemaName}});

// Saves the {{schemaCollection}} object to the database and returns a Promise
// The assumption here is that the Object is valid
module.exports.save = (object) => {
  return new Promise((resolve, reject) => {
    try {
      // any exception during construction will go to catch
      let {{camelCaseEntity}} = new {{schemaCollection}}(object);
      // on resolve we need to resolve the this method
      // on reject or exception we reject it,
      // this is because the record either saves or it doesnt
      // in any case it does not save, is a reject
      {{camelCaseEntity}}.save()
        .then((data) => {
          debug("saved successfully", data._id);
          resolve(data);
        }, (err) => {
          debug(`rejected save.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on save: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};


// Returns a limited set if all the {{camelCaseEntity}}(s) with a Promise
// if the collectiom has no records it Returns
// a promise with a result of  empty object i.e. {}
module.exports.findAll = (limit) => {
  if(limit < 1) {
    return {{schemaCollection}}.find({});
  }
  return {{schemaCollection}}.find({}).limit(limit);
};

// Finds the {{camelCaseEntity}} which matches the value parameter from {{camelCaseEntity}} collection
// If there is no object matching the attribute/value, return empty object i.e. {}
// null, undefined should be rejected with Invalid Argument Error
// Should return a Promise
module.exports.findOne = (attribute, value) => {
  return new Promise((resolve, reject) => {
    try {
      var query = {};
      query[attribute] = value;
      {{schemaCollection}}.findOne(query)
        .then((data) => {
          debug(`{{camelCaseEntity}} found ${data}`);
          resolve(data);
        }, (err) => {
          debug(`rejected find.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on find: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

// Finds all the {{camelCaseEntity}}s which matches the value parameter from {{camelCaseEntity}} collection
// If there is no object matching the attribute/value, return empty object i.e. {}
// null, undefined should be rejected with Invalid Argument Error
// Should return a Promise
module.exports.findMany = (attribute, value) => {
  return new Promise((resolve, reject) => {
    try {
      var query = {};
      query[attribute] = value;
      {{schemaCollection}}.find(query)
        .then((data) => {
          debug(`{{camelCaseEntity}} found ${data}`);
          resolve(data);
        }, (err) => {
          debug(`rejected find.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on find: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

// Finds the {{camelCaseEntity}} for the id parameter from the {{camelCaseEntity}} collection
// If there is no object matching the id, return empty object i.e. {}
// null, undefined, invalid objects should be rejected with Invalid Argument Error
// All returns are wrapped in a Promise
//
module.exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      {{schemaCollection}}.findById({
          _id: new ObjectId(id)
        })
        .then((res) => {
          debug("findById successfull: ", res);
          resolve(res);
        }, (err) => {
          debug(`rejected finding {{schemaCollection}}.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on finding {{camelCaseEntity}}: ${e}`);
          reject(e);
        });
    } catch (e) {
      debug(`caught exception: ${e}`);
      reject(e);
    }
  });
};

// Deletes all the entries of the collection.
// To be used by test only
module.exports.deleteAll = () => {
  return {{schemaCollection}}.remove({});
};
