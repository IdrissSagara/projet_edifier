let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
const clientDao = require('../dao/clientDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("getChantierOfClient", () => {
    it("Should return the chantiers client 2", async () => {
        const result = await clientDao.getChantierofClient(2);
        console.log(result);
        assert.isDefined(result);
        //assert(result.id === 3, 'Le chantier retourné ne correspond pas');
    });
});