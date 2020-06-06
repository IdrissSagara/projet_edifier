/**
 * https://www.npmjs.com/package/pdf-creator-node
 *
 * Templates de facture
 * https://github.com/sparksuite/simple-html-invoice-template
 * https://bootsnipp.com/snippets/8MPnQ
 */
const pdf = require("pdf-creator-node");
const fs = require('fs');

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
    genPDF, deleteFile,
};
