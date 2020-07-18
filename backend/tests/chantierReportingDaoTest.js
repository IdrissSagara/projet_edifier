const chai = require('chai');
const assert = chai.assert;
const chaiHttp = require('chai-http');
const chantierReportingDao = require('../dao/chantierReportingDao');

chai.use(chaiHttp);
chai.should();

describe("chantierReportingDao tests", () => {
    describe("getCount", () => {
        it("Should return total distinct chantiers count", async () => {
            const result = await chantierReportingDao.getCount();
            assert.isDefined(result);
            assert(typeof (result) === "number", 'La réponse attendue est un nombre');
        })
    });

    describe("getNotCompleted", () => {
        it("Should return total not completed chantiers (date_fin = null)", async () => {
            const result = await chantierReportingDao.getNotCompleted();
            assert.isDefined(result);
            assert(typeof (result.count) === "number", 'La réponse attendue doit avoir cout en nombre');
            assert(typeof (result.rows.length) === "number", 'Rows must exist as an array');
        })
    });

    describe("getCompleted", () => {
        it("Should return total completed chantiers (date_fin != null)", async () => {
            const result = await chantierReportingDao.getCompleted();
            assert.isDefined(result);
            assert(typeof (result.count) === "number", 'La réponse attendue doit avoir cout en nombre');
            assert(typeof (result.rows.length) === "number", 'Rows must exist as an array');
        })
    });

    describe("getNotfullyPaid", () => {
        it("Should return total not fully paid chantiers", async () => {
            const result = await chantierReportingDao.getNotfullyPaid();
            assert.isDefined(result);
            assert(typeof (result.length) === "number", 'Result must be an array of not fully paid chantiers');
        })
    });

    describe("getNoPaiementAtAll", () => {
        it("Should return total not paid at all chantiers", async () => {
            const result = await chantierReportingDao.getNoPaiementAtAll();
            assert.isDefined(result);
            assert(typeof (result.length) === "number", 'Result must be an array of not fully paid chantiers');
        })
    });
});
