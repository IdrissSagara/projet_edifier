let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
const ouvrierDao = require('../dao/ouvrierDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("getChantiersOfOuvrier", () => {
    it("Should return the chantiers ouvrier 6", async () => {
        const result = await ouvrierDao.getChantiersOfOuvrier(6);
        console.log(result);
        assert.isDefined(result);
        //assert(result.id === 3, 'Le chantier retourné ne correspond pas');
    });
});