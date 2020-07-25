let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
const ouvrierDao = require('../dao/ouvrierDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("ouvrierDao tests", () => {
    describe("getChantiersOfOuvrier", () => {
        it("Should return the chantiers ouvrier 6", async () => {
            const result = await ouvrierDao.getChantiersOfOuvrier(6);
            console.log(result);
            assert.isDefined(result);
            //assert(result.id === 3, 'Le chantier retourné ne correspond pas');
        });
    });

    describe("getCount", () => {
        it("Should return the total ouvriers count", async () => {
            const result = await ouvrierDao.getCount(6);
            assert.isDefined(result);
            assert(typeof (result) === "number", 'Result must be a number');
        });
    });
});
