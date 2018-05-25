const debug = require("debug")("evolvus-user:db:user");
const mongoose = require("mongoose");
const ObjectId = require('mongodb')
  .ObjectID;

const userSchema = require("./userSchema");

// Creates a User collection in the database
var User = mongoose.model("User", userSchema);

// Saves the user object to the database and returns a Promise
module.exports.save = (object) => {
  return new Promise((resolve, reject) => {
    try {
      // any exception during construction will go to catch
      let user = new User(object);

      // on resolve we need to resolve the this method
      // on reject or exception we reject it,
      // this is because the record either saves or it doesnt
      // in any case it does not save, is a reject
      user.save()
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

// Returns all the users with a Promise
// if the collectiom has not records it Returns
// a promise with a result of  empty object i.e. {}
module.exports.findAll = () => {
  return User.find({});
};

// Finds the user which matches the value parameter from user collection
// If there is no object matching the attribute/value, return empty object i.e. {}
// null, undefined should be rejected with Invalid Argument Error
// Should return a Promise
module.exports.findOne = (attribute, value) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(attribute) == "undefined" || attribute == null || typeof(value) == "undefined" || value == null) {
        throw new Error("IllegalArgumentException: attribute/value is null or undefined");
      }
      var query = {};
      query[attribute] = value;
      User.findOne(query)
        .then((data) => {
          debug(`user found ${data}`);
          if (data) {
            resolve(data);
          } else {
            // return empty object in place of null
            resolve({});
          }
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
// Finds the user for the id parameter from the user collection
// If there is no object matching the id, return empty object i.e. {}
// null, undefined, invalid objects should be rejected with Invalid Argument Error
// All returns are wrapped in a Promise
//
module.exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    try {
      if (typeof(id) == "undefined" || id == null) {
        throw new Error("IllegalArgumentException: id is null or undefined");
      }
      User.findById({
          _id: new ObjectId(id)
        })
        .then((res) => {
          debug("successfull: ", res);
          if (res) {
            resolve(res);
          } else {
            // return empty object in place of null
            resolve({});
          }
        }, (err) => {
          debug(`rejected finding user.. ${err}`);
          reject(err);
        })
        .catch((e) => {
          debug(`exception on finding user: ${e}`);
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
  return User.remove({});
};