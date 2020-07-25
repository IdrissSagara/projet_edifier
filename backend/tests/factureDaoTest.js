/**
 * @url Chai assertion library: https://www.chaijs.com/api/assert/
 * @type {Chai.ChaiStatic}
 */
// Import the dependencies for testing
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
const factureDao = require('../dao/factureDao');
let sequelize = require('sequelize');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("save facture", () => {
    let facture = {
        date_etablissement: new Date(),
        montant: 200,
        idChantier: 3,
    };
    it('should return the saved facture', async () => {
        const result = await factureDao.save(facture);

        console.log(result);
        assert.isDefined(result);
        assert(result.idChantier === 3);
    });
});
