const path = require('path');

const printOptions = require('../../../config/jwt_config.json').print_options;
const paiementDAO = require('../../../dao/paiementDao');
const chantierDAO = require('../../../dao/chantierDao');
const pdfUtil = require('./generatePDF');
const fs = require('fs');

const {validationResult} = require('express-validator');

async function sendRecuPDF(req, res, next) {
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

    let template_path = path.join(__dirname, 'recu_template.html');
    let pdf = await pdfUtil.genPDF(printOptions, template_path, data, './recu.pdf');

    /*let stream = fs.createReadStream(pdf.filename);
    stream.pipe(res).once("close", function () {
        stream.destroy(); // makesure stream closed, not close if download aborted.
        deleteFile(pdf.filename);
        return;
    });*/

    let file = fs.readFileSync(pdf.filename);
    return res.status(200).download(pdf.filename);
}

module.exports = {
    sendRecuPDF,
};