const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const clientDao = require('../dao/clientDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("chantierOuvrierDao tests", () => {
    describe("getChantierOfClient", () => {
        it("Should return the chantiers client 2", async () => {
            const result = await clientDao.getChantierofClient(2);
            console.log(result);
            assert.isDefined(result);
            //assert(result.id === 3, 'Le chantier retourné ne correspond pas');
        });
    });

    describe("getCount", () => {
        it("Should return total client count", async () => {
            const result = await clientDao.getCount();
            assert.isDefined(result);
            assert(typeof (result) === "number", 'Result must be a number');
        });
    });
});
