/**
 * https://www.npmjs.com/package/pdf-creator-node
 *
 * Templates de facture
 * https://github.com/sparksuite/simple-html-invoice-template
 * https://bootsnipp.com/snippets/8MPnQ
 */

let pdf = require("pdf-creator-node");
let fs = require('fs');

async function genPDF(options, template_path, data, output_path) {

// Read HTML Template
    let html = fs.readFileSync(template_path, 'utf8');

    console.log('template_path: ' + template_path);

    let document = {
        html: html,
        data,
        path: output_path
    };

    return await pdf.create(document, options);
}

async function cleanFile(file_path) {
    await fs.unlink(file_path, (err) => {
        return !err;
    });
}

module.exports = {
    genPDF, cleanFile
};
