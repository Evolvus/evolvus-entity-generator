const debug = require("debug")("evolvus-user.test.db.user");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const user = require("../../db/user");
//const userSchema = require("../../db/userSchema");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/Test";

chai.use(chaiAsPromised);

//var User = mongoose.model("User", userSchema);
// High level wrapper
// Testing db/user.js
describe("db user testing", () => {

  /*
   ** Before doing any tests, first get the connection.
   */
  before((done) => {
    mongoose.connect(MONGO_DB_URL);
    let connection = mongoose.connection;
    connection.once("open", () => {
      debug("ok got the connection");
      done();
    });
  });

  describe("testing user.save", () => {
    // Testing save
    // 1. Valid user should be saved.
    // 2. Non user object should not be saved.
    // 3. Should not save same user twice.
    beforeEach((done) => {
      user.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid user to database", (done) => {
      let testUser = {
        "username": "kavya",
        "email": "kavya@gmail.com",
        "password": "Evolvus5"
      };
      let res = user.save(testUser);
      expect(res)
        .to.eventually.include(testUser)
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a user object
      let testObject = {
        "sample": "kavya"
      };
      let res = user.save(testObject);
      expect(res)
        .to.be.eventually.rejectedWith("User validation failed")
        .notify(done);
    });

    it("should fail saving invalid password to database", (done) => {
      let testObject = {
        "username": "kavya",
        "email": "kavya@gmail.com",
        "password": ""
      };
      let res = user.save(testObject);
      expect(res)
        .to.be.eventually.rejectedWith("User validation failed")
        .notify(done);
    });

  });

  describe("testing user.find with data", () => {
    // 1. Delete all records in the table and insert
    //    two new records.
    // find -should return an array of size 2 with the
    // two users.
    // Caveat - the order of the users fetched is indeterminate

    let testUser = {
      "username": "user",
      "email": "user@gmail.com",
      "password": "Evolvus5"
    };
    let testUser1 = {
      "username": "userOne",
      "email": "userOne@gmail.com",
      "password": "Evolvus5"
    };

    // delete all records and insert two users
    beforeEach((done) => {
      user.deleteAll()
        .then((res) => {
          user.save(testUser)
            .then((res) => {
              user.save(testUser1)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it("should return 2 users ", (done) => {
      let res = user.findAll();
      expect(res)
        .to.be.fulfilled.then((users) => {
          expect(users)
            .to.be.a('array');
          expect(users.length)
            .to.equal(2);
          expect(users[0])
            .to.include(testUser);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing user.find without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      user.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = user.findAll();
      expect(res)
        .to.be.fulfilled.then((users) => {
          expect(users)
            .to.be.a('array');
          expect(users.length)
            .to.equal(0);
          expect(users)
            .to.eql([]);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing user.findById", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by this id and it should return one User
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    // 5. Query with arbitrary object
    let testUser = {
      "username": "user",
      "email": "user@gmail.com",
      "password": "Evolvus5"
    };
    var id;
    beforeEach((done) => {
      user.deleteAll()
        .then((res) => {
          user.save(testUser)
            .then((userSaved) => {
              id = userSaved._id;
              done();
            });
        });
    });

    it("should return user identified by Id ", (done) => {
      let res = user.findById(id);
      expect(res)
        .to.eventually.include(testUser)
        .notify(done);
    });

    it("should return empty object i.e. {} as no user is identified by this Id ", (done) => {
      let badId = new mongoose.mongo.ObjectId();
      let res = user.findById(badId);
      expect(res)
        .to.eventually.to.eql({})
        .notify(done);
    });

    it("should throw IllegalArgumentException for undefined Id parameter ", (done) => {
      let undefinedId;
      let res = user.findById(undefinedId);
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

    it("should throw IllegalArgumentException for null Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value+
      let res = user.findById(null);
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let id = testUser;
      let res = user.findById(testUser);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });
  });

  describe("testing user.findOne", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by email attribute and it should return one User
    // 2. Query by an arbitrary email and it should return {}
    var id;
    let testUser = {
      "username": "user1",
      "email": "user1@gmail.com",
      "password": "Evolvus5"
    };
    let testUser1 = {
      "username": "user2",
      "email": "user2@gmail.com",
      "password": "Evolvus5"
    };

    // delete all records and insert two users
    beforeEach((done) => {
      user.deleteAll()
        .then((res) => {
          user.save(testUser)
            .then((userSaved) => {
              id = userSaved._id;
              done();
            });
        });
    });

    it("should return  object for valid attribute value", (done) => {
      let res = user.findOne("email", "user1@gmail.com");
      expect(res)
        .to.eventually.include(testUser)
        .notify(done);
    });

    it("should return empty object i.e. {} as no user is identified by this attribute ", (done) => {
      let res = user.findOne("email", "kavya@gmail.com");
      expect(res)
        .to.eventually.to.eql({})
        .notify(done);
    });


    it("should throw IllegalArgumentException for undefined attribute parameter ", (done) => {
      let undefinedAttr;
      let res = user.findOne(undefinedAttr, "user1@gmail.com");
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

    it("should throw IllegalArgumentException for undefined value parameter ", (done) => {
      let undefinedValue;
      let res = user.findOne("email", undefinedValue);
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

    it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
      let res = user.findOne(null, "user1@gmail.com");
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

    it("should throw IllegalArgumentException for null value parameter ", (done) => {
      let res = user.findOne("email", null);
      expect(res)
        .to.eventually.to.be.rejectedWith("IllegalArgumentException")
        .notify(done);
    });

  });
});
