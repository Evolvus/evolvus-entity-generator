const debug = require("debug")("{{moduleName}}.test.db.{{dbEntityFileName}}");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const {{camelCaseEntity}} = require("../../db/{{dbEntityFileName}}");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/Test{{schemaCollection}}";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/{{camelCaseEntity}}.js
describe("db {{camelCaseEntity}} testing", () => {
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

  let object1 = {
    // add a valid {{camelCaseEntity}} object

  };
  let object2 = {
  // add a valid {{camelCaseEntity}} object

  };

  describe("testing {{camelCaseEntity}}.save", () => {
    // Testing save
    // 1. Valid {{camelCaseEntity}} should be saved.
    // 2. Non {{camelCaseEntity}} object should not be saved.
    // 3. Should not save same {{camelCaseEntity}} twice.
    beforeEach((done) => {
      {{camelCaseEntity}}.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid {{camelCaseEntity}} to database", (done) => {
      let test{{schemaCollection}} = {
        // add a valid {{camelCaseEntity}} object
      };
      let res = {{camelCaseEntity}}.save(test{{schemaCollection}});
      expect(res)
        .to.eventually.include(test{{schemaCollection}})
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a {{enity}} object

      let invalidObject = {
        // add a invalid {{camelCaseEntity}} object

      };
      let res = {{camelCaseEntity}}.save(invalidObject);
      expect(res)
        .to.be.eventually.rejectedWith("{{schemaCollection}} validation failed")
        .notify(done);
    });
  });

  describe("testing {{camelCaseEntity}}.find with data", () => {
    // 1. Delete all records in the table and insert
    //    two new records.
    // find -should return an array of size 2 with the
    // two {{camelCaseEntity}}s.
    // Caveat - the order of the {{camelCaseEntity}}s fetched is indeterminate

    // delete all records and insert two {{camelCaseEntity}}s
    beforeEach((done) => {
      {{camelCaseEntity}}.deleteAll()
        .then((res) => {
          {{camelCaseEntity}}.save(object1)
            .then((res) => {
              {{camelCaseEntity}}.save(object2)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it("should return 2 {{camelCaseEntity}}s ", (done) => {
      let res = {{camelCaseEntity}}.findAll();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(2);
          expect(docs[0])
            .to.include(object1);
          done();
        }, (err) => {
          done(err);
        })
        .catch((e) => {
          done(e);
        });
    });
  });

  describe("testing {{camelCaseEntity}}.find without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      {{camelCaseEntity}}.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = {{camelCaseEntity}}.findAll();
      expect(res)
        .to.be.fulfilled.then((docs) => {
          expect(docs)
            .to.be.a('array');
          expect(docs.length)
            .to.equal(0);
          expect(docs)
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

  describe("testing {{camelCaseEntity}}.findById", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by this id and it should return one {{camelCaseEntity}}
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    // 5. Query with arbitrary object
    let testObject = {
      //add a valid {{camelCaseEntity}} object

    };
    var id;
    beforeEach((done) => {
      {{camelCaseEntity}}.deleteAll()
        .then((res) => {
          {{camelCaseEntity}}.save(testObject)
            .then((savedObj) => {
              id = savedObj._id;
              done();
            });
        });
    });

    it("should return {{camelCaseEntity}} identified by Id ", (done) => {
      let res = {{camelCaseEntity}}.findById(id);
      expect(res)
        .to.eventually.include(testObject)
        .notify(done);
    });

    it("should return null as no {{camelCaseEntity}} is identified by this Id ", (done) => {
      let badId = new mongoose.mongo.ObjectId();
      let res = {{camelCaseEntity}}.findById(badId);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing {{camelCaseEntity}}.findOne", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by one attribute and it should return one {{camelCaseEntity}}
    // 2. Query by an arbitrary attribute value and it should return {}
    var id;

    // delete all records and insert two {{camelCaseEntity}}s
    beforeEach((done) => {
      {{camelCaseEntity}}.deleteAll()
        .then((res) => {
          {{camelCaseEntity}}.save(object1)
            .then((savedObj) => {
              id = savedObj._id;
              done();
            });
        });
    });

    it("should return object for valid attribute value", (done) => {
      // take one valid attribute and its value
      let attributename="";
      let attributeValue="";
      let res = {{camelCaseEntity}}.findOne(attributename, attributeValue);
      expect(res)
        .to.eventually.include(object1)
        .notify(done);
    });

    it("should return null as no {{camelCaseEntity}} is identified by this attribute ", (done) => {
      let res = {{camelCaseEntity}}.findOne(validAttribute, invalidValue);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });
});
