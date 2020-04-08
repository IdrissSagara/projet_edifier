let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let app = require('../app');
const mvtDao = require('../dao/mouvementDao');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("create a mouvement", () => {
    let mouvement = {
        montant: 200,
        source: 5,
        destination: 23,
        commentaire: "req.body.commentaire",
    };
    it("Return the newly created mouvement", async () => {
        const result = await mvtDao.save(mouvement);
        console.log(result);
        assert.isDefined(result);
        //assert(result.id === 3, 'Le chantier retourné ne correspond pas');
    });
});
