const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const userDao = require('../dao/userDAO');

chai.use(chaiHttp);
chai.should();

describe("userDao tests", () => {
    describe("getCount", () => {
        it("Should return total distinct users count", async () => {
            const result = await userDao.getCount();
            assert.isDefined(result);
            assert(typeof (result) === "number", 'Result must be a number');
        })
    });
});

