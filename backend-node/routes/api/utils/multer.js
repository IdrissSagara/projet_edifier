//https://www.technouz.com/4839/how-to-upload-an-image-to-a-node-express-api/

const multer = require('multer');
let fs = require('fs');
let path = require('path');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let id = req.params.id;
        req.params.type = (req.originalUrl.indexOf('chantier') === -1) ? 'user' : 'chantier';
        let dirName = path.join(__dirname, '../../../uploads/' + req.params.type + '/' + id);

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        cb(null, dirName)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const saveToUploads = multer({storage: diskStorage});

module.exports = {
    saveToUploads: saveToUploads.single('image')
};
