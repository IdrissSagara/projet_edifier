const path = require('path');

const printOptions = require('../../../config/jwt_config.json').print_options;
const paiementDAO = require('../../../dao/paiementDao');
const chantierDAO = require('../../../dao/chantierDao');
const pdfUtil = require('./generatePDF');
const fs = require('fs');

async function sendFacturePDF(req, res, next) {
    const chantierId = req.params.id;
    let chantier = await chantierDAO.getChantierById(chantierId);

    if (!chantier) {
        return res.status(404).json({
            status: 'error',
            message: `Impossible de continuer! Auncun chantier trouvé avec l'identifiant ${chantierId}`
        });
    }

    if (chantier.status === 'error') {
        return res.status(500).json(chantier);
    }

    chantier = chantier.get({plain: true});

    console.log(chantier);

    let data = {
        chantier
    };

    let template_path = path.join(__dirname, 'facture_template.html');
    let pdf = await pdfUtil.genPDF(printOptions, template_path, data, './facture.pdf');

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
    sendFacturePDF,
};