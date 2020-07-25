const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const chantierOuvrierDao = require('../dao/chantierOuvrierDao');

chai.use(chaiHttp);
chai.should();

describe("chantierOuvrierDao tests", () => {
    describe("getOuvrierCount", () => {
        it("Should return total distinct ouvrier involved in chantiers count", async () => {
            const result = await chantierOuvrierDao.getOuvrierCount();
            assert.isDefined(result);
            assert(typeof (result) === "number", 'Result must be a number');
        })
    });
});
