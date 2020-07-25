let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
const mvtDao = require('../dao/mouvementDao');

// Configure chai
chai.use(chaiHttp);
chai.should();


describe("chantierOuvrierDao tests", () => {
    describe("mouvement creation", () => {
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

    describe("getLast", () => {
        it("Should return the last inserted mouvement", async () => {
            const result = await mvtDao.getLast();
            assert.isDefined(result);
        });
    });
});
