//https://www.technouz.com/4839/how-to-upload-an-image-to-a-node-express-api/

const multer = require('multer');
let fs = require('fs');
let path = require('path');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let dirName = path.join(__dirname, '../../../public/uploads/logo');

        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        cb(null, dirName)
    },
    filename: (req, file, cb) => {
        cb(null, 'logo' + path.extname(file.originalname));
    }
});

// multer filter example https://stackoverflow.com/a/38692588
const saveLogo = multer({
    storage: diskStorage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
            return callback(new Error('Only images are allowed'))
        }
        callback(null, true)
    },
    limits: {
        fileSize: 1024 * 1024
    }
});

module.exports = {
    saveLogo: saveLogo.single('logo')
};
