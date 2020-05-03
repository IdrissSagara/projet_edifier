/**
 * https://www.npmjs.com/package/pdf-creator-node
 *
 * Templates de facture
 * https://github.com/sparksuite/simple-html-invoice-template
 * https://bootsnipp.com/snippets/8MPnQ
 */
const pdf = require("pdf-creator-node");
const fs = require('fs');
const path = require('path');

const printOptions = require('../../../config/jwt_config').print_options;
const paiementDAO = require('../../../dao/paiementDao');
const chantierDAO = require('../../../dao/chantierDao');

const {validationResult} = require('express-validator');

async function genPDF(options, template_path, data, output_path) {

// Read HTML Template
    let html_template = fs.readFileSync(template_path, 'utf8');

    let document = {
        html: html_template,
        data,
        path: output_path
    };

    return await pdf.create(document, options);
}

async function sendFacturePDF(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({errors: errors.array()});
    }

    let paiement, chantier;
    let infosPaiement = req.infosFacture;
    if (!infosPaiement) {
        paiement = await paiementDAO.getPaiementById(req.params.id);

        if (!paiement) {
            return res.status(404).json({
                status: 'error',
                message: `Aucun paiement trouvé avec l'identifiant ` + req.params.id
            });
        }

        if (paiement.status === 'error') {
            return res.status(500).json(paiement);
        }
        paiement.p = paiement.get({plain: true});

        chantier = await chantierDAO.getChantierById(paiement.ChantierId);

        if (!chantier) {
            return res.status(404).json({
                status: 'error',
                message: `Auncun chantier trouvé avec l'identifiant ` + paiement.ChantierId
            });
        }

        if (chantier.status === 'error') {
            return res.status(500).json(chantier);
        }

        chantier = chantier.get({plain: true});
        paiement.ch = chantier;
    } else {
        paiement = infosPaiement;
    }

    console.log(paiement);

    let data = {
        paiement: paiement.p,
        client: paiement.ch.Client,
        chantier: paiement.ch
    };

    let template_path = path.join(__dirname, 'facture_template.html');
    let pdf = await genPDF(printOptions, template_path, data, './facture.pdf');

    /*let stream = fs.createReadStream(pdf.filename);
    stream.pipe(res).once("close", function () {
        stream.destroy(); // makesure stream closed, not close if download aborted.
        deleteFile(pdf.filename);
        return;
    });*/

    let file = fs.readFileSync(pdf.filename);
    return res.status(200).download(pdf.filename);
}

function deleteFile(file) {
    fs.unlink(file, function (err) {
        if (err) {
            console.error(err.toString());
        } else {
            console.warn(file + ' supprimé');
        }
    });
}

module.exports = {
    genPDF, deleteFile, sendFacturePDF
};
