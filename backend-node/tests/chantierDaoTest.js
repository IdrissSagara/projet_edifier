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

describe("update chantier", () => {
    let chantier = {
        id: 3,
        emplacement: "boul city",
        cout: 323,
        date_debut: "2019-12-31T23:00:00.000Z",
        date_fin: null,
        walita: 0,
        yereta: 323000,
        montant_dispo: 323000,
        createdAt: "2019-12-30T02:08:04.000Z",
        updatedAt: "2020-03-01T04:57:33.000Z",
        ClientId: 2,
    };

    it("Should update the chantier with the id 3", async () => {
        const result = await chantierDAO.update(chantier);
        //console.log(result);
        assert.isDefined(result);
        assert.notEqual(result.status, 'error', 'must success');
        assert(result[0] === 1, 'must return 1')
    });

    it("Should fail trying to update inextant chantier", async () => {
        chantier.id = 99999;
        const result = await chantierDAO.update(chantier);
        console.log(result);
        assert.isDefined(result);
        assert(result[0] === 0, 'must return O')
    });
});