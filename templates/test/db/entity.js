const debug = require("debug")("evolvus-{{entity}}.test.db.{{entity}}");
const mongoose = require("mongoose");
const chai = require("chai");
const chaiAsPromised = require("chai-as-promised");
const expect = chai.expect;
const {{entity}} = require("../../db/{{entity}}");

var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/Test{{schemaCollection}}";

chai.use(chaiAsPromised);

// High level wrapper
// Testing db/{{entity}}.js
describe("db {{entity}} testing", () => {
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
    // add a valid {{entity}} object

  };
  let object2 = {
  // add a valid {{entity}} object

  };

  describe("testing {{entity}}.save", () => {
    // Testing save
    // 1. Valid {{entity}} should be saved.
    // 2. Non {{entity}} object should not be saved.
    // 3. Should not save same {{entity}} twice.
    beforeEach((done) => {
      {{entity}}.deleteAll()
        .then((data) => {
          done();
        });
    });

    it("should save valid {{entity}} to database", (done) => {
      let test{{schemaCollection}} = {
        // add a valid {{entity}} object
      };
      let res = {{entity}}.save(test{{schemaCollection}});
      expect(res)
        .to.eventually.include(test{{schemaCollection}})
        .notify(done);
    });

    it("should fail saving invalid object to database", (done) => {
      // not even a {{enity}} object

      let invalidObject = {
        // add a invalid {{entity}} object

      };
      let res = {{entity}}.save(invalidObject);
      expect(res)
        .to.be.eventually.rejectedWith("{{schemaCollection}} validation failed")
        .notify(done);
    });
  });

  describe("testing {{entity}}.find with data", () => {
    // 1. Delete all records in the table and insert
    //    two new records.
    // find -should return an array of size 2 with the
    // two {{entity}}s.
    // Caveat - the order of the {{entity}}s fetched is indeterminate

    // delete all records and insert two {{entity}}s
    beforeEach((done) => {
      {{entity}}.deleteAll()
        .then((res) => {
          {{entity}}.save(object1)
            .then((res) => {
              {{entity}}.save(object2)
                .then((res) => {
                  done();
                });
            });
        });
    });

    it("should return 2 {{entity}}s ", (done) => {
      let res = {{entity}}.findAll();
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

  describe("testing {{entity}}.find without data", () => {
    // delete all records
    // find should return empty array
    beforeEach((done) => {
      {{entity}}.deleteAll()
        .then((res) => {
          done();
        });
    });

    it("should return empty array i.e. []", (done) => {
      let res = {{entity}}.findAll();
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

  describe("testing {{entity}}.findById", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by this id and it should return one {{entity}}
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    // 5. Query with arbitrary object
    let testObject = {
      //add a valid {{entity}} object

    };
    var id;
    beforeEach((done) => {
      {{entity}}.deleteAll()
        .then((res) => {
          {{entity}}.save(testObject)
            .then((savedObj) => {
              id = savedObj._id;
              done();
            });
        });
    });

    it("should return {{entity}} identified by Id ", (done) => {
      let res = {{entity}}.findById(id);
      expect(res)
        .to.eventually.include(testObject)
        .notify(done);
    });

    it("should return null as no {{entity}} is identified by this Id ", (done) => {
      let badId = new mongoose.mongo.ObjectId();
      let res = {{entity}}.findById(badId);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });

  describe("testing {{entity}}.findOne", () => {
    // Delete all records, insert one record , get its id
    // 1. Query by one attribute and it should return one {{entity}}
    // 2. Query by an arbitrary attribute value and it should return {}
    var id;

    // delete all records and insert two {{entity}}s
    beforeEach((done) => {
      {{entity}}.deleteAll()
        .then((res) => {
          {{entity}}.save(object1)
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
      let res = {{entity}}.findOne(attributename, attributeValue);
      expect(res)
        .to.eventually.include(object1)
        .notify(done);
    });

    it("should return null as no {{entity}} is identified by this attribute ", (done) => {
      let res = {{entity}}.findOne(validAttribute, invalidValue);
      expect(res)
        .to.eventually.to.eql(null)
        .notify(done);
    });
  });
});
