const chai = require("chai");

/*
 ** chaiAsPromised is needed to test promises
 ** it adds the "eventually" property
 **
 ** chai and others do not support async / await
 */
const chaiAsPromised = require("chai-as-promised");

const expect = chai.expect;
chai.use(chaiAsPromised);

const user = require("../index");

describe("user model testing", () => {
  describe("user model validation", () => {

    it("valid user should validate successfully", (done) => {
      let userObject = {
        username: "test user",
        email: "test@gmail.com",
        password: ""
      };

      try {
        var res = user.validate(userObject);
        expect(res)
          .to.eventually.equal(true)
          .notify(done);
        // if notify is not done the test will fail
        // with timeout
      } catch (e) {
        expect.fail(e, null, `valid user should not throw exception: ${e}`);
      }
    });

    it("invalid user should faile validation", (done) => {
      let badObject = {
        "email": "test@gmail.com",
        "password": "something"
      };
      var res = user.validate(badObject);
      expect(res)
        .to.be.eventually.equal(false)
        .notify(done);
    });


  });

  describe("authentication should be proper", () => {

    it("should pass valid passwords", (done) => {
      try {
        var res = user.authenticate("something", "abracadabra");
        expect(res)
          .to.eventually.equal(true)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `authenticate should not throw exception: ${e}`);
      }
    });

    it("should pass invalid passwords", (done) => {
      try {
        var res = user.authenticate("something", "12abracadabra");
        expect(res)
          .to.eventually.equal(false)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `authenticate should not throw exception: ${e}`);
      }
    });
  });


  describe('testing Registering a user', () => {
    it('should register valid user', (done) => {
      try {
        var res = user.register({
          "username": "kavya",
          "email": 'kavya@gmail.com',
          "password": '*Evolvus5'
        });
        expect(res)
          .to.eventually.equal(true)
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `register should not throw exception: ${e}`);
      }
    });

    it('should reject invalid user', (done) => {
      try {
        var res = user.register({
          "usernname": "kavya",
          "email": 'kavya@gmail.com',
          "password": '*Evolvus5'
        });
        expect(res)
          .to.eventually.rejectedWith('Validation failed')
          .notify(done);
      } catch (e) {
        expect.fail(e, null, `register should not throw exception: ${e}`);
      }
    });
  });
});