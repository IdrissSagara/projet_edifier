/**
 * @url Chai assertion library: https://www.chaijs.com/api/assert/
 * @type {Chai.ChaiStatic}
 */
// Import the dependencies for testing
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
const chantierDAO = require('../dao/chantierDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("getChantierById", () => {
    it("Should return the chantier with the id 3", async () => {
        const result = await chantierDAO.getChantierById(3);
        //console.log(result);
        assert.isDefined(result);
        assert(result.id === 3, 'Le chantier retourné ne correspond pas');
    });

    it("Should return the chantier 3 with its client", async () => {
        const result = await chantierDAO.getChantierById(3);
        assert.isDefined(result.Client.nom, `result.Client.nom n'est pas defini`);
        assert.isDefined(result.Client.prenom, `result.Client.nom n'est pas defini`);
        assert.isDefined(result.Client.telephone, `result.Client.nom n'est pas defini`);
    });

    it("Should return null as result for inexistant chantier id", async () => {
        const result = await chantierDAO.getChantierById(300);
        assert(result === null, 'Le chantier doit etre null');
    });
});