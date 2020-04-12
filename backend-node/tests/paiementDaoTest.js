/**
 * @url Chai assertion library: https://www.chaijs.com/api/assert/
 * @type {Chai.ChaiStatic}
 */
// Import the dependencies for testing
let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
const paiementDao = require('../dao/paiementDao');
let sequelize = require('sequelize');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("get all paiements", () => {
    it('should return all the paiements', async () => {
        const result = await paiementDao.getAll({
            where: {chantierId: 1},
            attributes: [
                'id',
                [sequelize.fn('sum', sequelize.col('montant')), 'total_amount'],
            ],
            group: ['id'],
            raw: true
        });
        let total_amount = 0;
        result.map(i => {
            return total_amount += parseFloat(i.total_amount);
        });
        console.log(total_amount);
        assert.isDefined(result);
    });
});