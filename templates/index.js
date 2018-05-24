const debug = require("debug")("{{moduleName}}:db:index");
const userSchema = require("./model/{{schemaName}}")
  .schema;
const user = require("./db/{{entity}}");
const validate = require("jsonschema")
  .validate;

module.exports.validate = ({
    {
      entity
    }
  }
  Object) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate(userObject, userSchema);
      debug("validation status: ", JSON.stringify(res));
      resolve(res.valid);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports.authenticate = (email, password) => {
  // Call the database apis to authenticate the username/password combination
  return new Promise((resolve, reject) => {
    try {
      // if password matches resolve(true)
      // else resolve(false);
      // for testing...
      if (password === "abracadabra") {
        resolve(true);
      } else {
        resolve(false);
      }

    } catch (e) {
      reject(e);
    }
  });
};
/*
 ** Registers a user. Registering a user saves it to the database
 */
module.exports.register = (user) => {
  return new Promise((resolve, reject) => {
    try {
      var res = validate(user, userSchema);
      debug("validation status: ", JSON.stringify(res));
      if (res.valid) {
        resolve(true);
      } else {
        reject('Validation failed');
      }
    } catch (e) {
      reject(e);
    }
  });
};
