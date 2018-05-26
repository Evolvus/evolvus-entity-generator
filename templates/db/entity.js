const debug = require("debug")("evolvus-{{entity}}:db:{{entity}}");
const mongoose = require("mongoose");
const ObjectId = require('mongodb')
  .ObjectID;

const {{schemaName}} = require("./{{schemaName}}");

// Creates a {{schemaCollection}} collection in the database
var {{schemaCollection}} = mongoose.model("{{schemaCollection}}", {{schemaName}});

// Saves the {{schemaCollection}} object to the database and returns a Promise
module.exports.save = (object) => {
  return new Promise((resolve, reject) => {
    try {
      // any exception during construction will go to catch
      let {{entity}} = new {{schemaCollection}}(object);
      // on resolve we need to resolve the this method
      // on reject or exception we reject it,
      // this is because the record either saves or it doesnt
      // in any case it does not save, is a reject
      {{entity}}.save()
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

// Returns all the {{entity}}s with a Promise
// if the collectiom has not records it Returns
// a promise with a result of  empty object i.e. {}
module.exports.findAll = () => {
  return {{schemaCollection}}.find({});
};

// Finds the {{entity}} which matches the value parameter from {{entity}} collection
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
          debug(`{{entity}} found ${data}`);
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

//
// Finds the {{entity}} for the id parameter from the {{entity}} collection
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
          debug("successfull: ", res);
          resolve(res);
        }, (err) => {
          debug(`rejected finding {{schemaCollection}}.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on finding {{entity}}: ${e}`);
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
