let chai = require('chai');
let assert = chai.assert;
let chaiHttp = require('chai-http');
let genPDF = require('./generatePDF');
let path = require('path');

// Configure chai
chai.use(chaiHttp);
chai.should();

describe("generate PDF", () => {
    it('should generate a pdf', async () => {
        let options = {
            format: "A3",
            orientation: "portrait",
            border: "10mm",
            header: {
                height: "45mm",
                //contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
            },
            "footer": {
                "height": "28mm",
                "contents": {
                    2: 'Second page', // Any page number is working. 1-based index
                    default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
                }
            }
        };

        let data = {
            facture: {
                id: 3,
                montant: 200,
                idChantier: 7,
                mode_paiement: 'Chèque',
                createdAt: (new Date()).toUTCString(),
            },
            client: {
                nom: 'Tounkara',
                prenom: 'Ami',
                telephone: '66 00 00 00'
            },
            chantier: {
                emplacement: 'mon quartier',
                cout: 4750000
            }
        };

        let template_path = path.join(__dirname, 'recu_template.html');
        let pdf = await genPDF.genPDF(options, template_path, data, './facture_' + data.facture.id + '.pdf');

        console.log(pdf);
        assert.isDefined(pdf.filename);
    });
});
