const debug = require("debug")("evolvus-{{entity}}.test.db.{{entity}}");
const chai = require("chai");
const mongoose = require("mongoose");
var MONGO_DB_URL = process.env.MONGO_DB_URL || "mongodb://localhost/Test{{schemaCollection}}";
/*
 ** chaiAsPromised is needed to test promises
 ** it adds the "eventually" property
 **
 ** chai and others do not support async / await
 */
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

const {{entity}} = require("../index");
const db = require("../db/{{entity}}");

describe('{{entity}} model validation', () => {
  let {{entity}}Object = {
    // add a valid {{entity}} Object here

  };

  let invalidObject={
    //add invalid {{entity}} Object here

  };
    before((done) => {
      mongoose.connect(MONGO_DB_URL);
      let connection = mongoose.connection;
      connection.once("open", () => {
        debug("ok got the connection");
        done();
      });
    });

describe("validation against jsonschema",()=> {
  it("valid {{entity}} should validate successfully", (done) => {
    try {
      var res = {{entity}}.validate({{entity}}Object);
      expect(res)
        .to.eventually.equal(true)
        .notify(done);
      // if notify is not done the test will fail
      // with timeout
    } catch (e) {
      expect.fail(e, null, `valid {{entity}} object should not throw exception: ${e}`);
    }
  });

  it("invalid {{entity}} should return errors", (done) => {
    try {
      var res = {{entity}}.validate(invalidObject);
      expect(res)
        .to.be.rejected
        .notify(done);
    } catch (e) {
      expect.fail(e, null, `exception: ${e}`);
    }
  });
});

describe("testing {{entity}}.save method",()=> {

  beforeEach((done)=> {
    db.deleteAll().then((res)=> {
      done();
    });
  });

  it('should save a {{entity}} object to database', (done) => {
    try {
      var result = {{entity}}.save({{entity}}Object);
      //replace anyAttribute with one of the valid attribute of a {{entity}} Object
      expect(result)
        .to.eventually.have.property("anyAttribute")
        .to.eql({{entity}}Object.anyAttribute)
        .notify(done);
    } catch (e) {
      expect.fail(e, null, `saving {{entity}} object should not throw exception: ${e}`);
    }
  });

  it('should not save a invalid {{entity}} object to database', (done) => {
    try {
      var result = {{entity}}.save(invalidObject);
      expect(result)
        .to.be.rejectedWith("{{schemaCollection}} validation failed")
        .notify(done);
    } catch (e) {
      expect.fail(e, null, `exception: ${e}`);
    }
  });

});

  describe('testing {{entity}}.getAll when there is data in database', () => {
    let object1={
      //add one valid {{entity}} object here

    },object2={
      //add one more valid {{entity}} object here

    };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
              done();
          });
        });
      });
    });

    it('should return all records', (done) => {
      try {
        let res = {{entity}}.getAll();
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(2);
            done();
          });
      } catch (e) {
          expect.fail(e, null, `exception: ${e}`);
      }
    });

  });

  describe('testing {{entity}}.getAll when there is no data', () => {

    beforeEach((done) => {
      db.deleteAll().then((res) => {
        done();
      });
    });

    it('should return empty array', (done) => {
      try {
        let res = {{entity}}.getAll();
        expect(res)
          .to.be.fulfilled.then((docs) => {
            expect(docs)
              .to.be.a('array');
            expect(docs.length)
              .to.equal(0);
            expect(docs)
              .to.eql([]);
            done();
          });
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });

  describe('testing getById', () => {
    // Insert one record , get its id
    // 1. Query by this id and it should return one {{entity}} object
    // 2. Query by an arbitrary id and it should return {}
    // 3. Query with null id and it should throw IllegalArgumentException
    // 4. Query with undefined and it should throw IllegalArgumentException
    var id;
    beforeEach((done) => {
      db.save({{entity}}Object).then((res) => {
        id = res._id;
        done();
      });
    });

    it('should return one audit matching parameter id', (done) => {
      try {
        var res = {{entity}}.getById(id);
        expect(res).to.eventually.have.property('_id')
          .to.eql(id)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no {{entity}} is identified by this Id ', (done) => {
      try {
        let badId = new mongoose.mongo.ObjectId();
        var res = {{entity}}.getById(badId);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Id parameter ", (done) => {
      try {
        let undefinedId;
        let res = {{entity}}.getById(undefinedId);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null Id parameter ", (done) => {
      try {
        let res = {{entity}}.getById(null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should be rejected for arbitrary object as Id parameter ", (done) => {
      // an id is a 12 byte string, -1 is an invalid id value
      let id = {{entity}}Object;
      let res = {{entity}}.getById(id);
      expect(res)
        .to.eventually.to.be.rejectedWith("must be a single String of 12 bytes")
        .notify(done);
    });

  });

  describe("testing {{entity}}.getOne",()=> {
    let object1={
      //add one valid {{entity}} object here

    },object2={
      //add one more valid {{entity}} object here

    };
    beforeEach((done) => {
      db.deleteAll().then((res) => {
        db.save(object1).then((res) => {
          db.save(object2).then((res) => {
              done();
          });
        });
      });
    });

    it("should return one {{entity}} record identified by attribute",(done)=> {
      try {
        // take one attribute from object1 or object2 and its value
        let res = {{entity}}.getOne(attribute of object1/object2,its value);
        expect(res)
          .to.eventually.be.a("object")
          .to.have.property('attribute of object1/object2')
          .to.eql('attribute value')
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it('should return empty object i.e. {} as no {{entity}} is identified by this attribute', (done) => {
      try {
        // replace validAttribute and add a bad value to it
        var res = {{entity}}.getOne(validAttribute,badValue);
        expect(res).to.eventually.to.eql({})
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        //replace validvalue with a valid value for an attribute
        let undefinedAttribute;
        let res = {{entity}}.getOne(undefinedAttribute,validValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for undefined Attribute parameter ", (done) => {
      try {
        // replace validAttribute with a valid attribute name
        let undefinedValue;
        let res = {{entity}}.getOne(validAttribute,undefinedValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null attribute parameter ", (done) => {
      try {
        //replace validValue with a valid value for an attribute
        let res = {{entity}}.getOne(null,validValue);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });

    it("should throw IllegalArgumentException for null value parameter ", (done) => {
      try {
        //replace attributeValue with a valid attribute name
        let res = {{entity}}.getOne(attributeValue,null);
        expect(res)
          .to.eventually.to.be.rejectedWith("IllegalArgumentException")
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `exception: ${e}`);
      }
    });
  });
});
