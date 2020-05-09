//https://www.technouz.com/4839/how-to-upload-an-image-to-a-node-express-api/

const multer = require('multer');
let fs = require('fs');
let path = require('path');

const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let id = req.params.id;
        let type = (req.originalUrl.indexOf('chantier') === -1) ? 'user' : 'chantier';
        console.log('\ntype de photo: ');
        console.log(type);
        let dirName = path.join(__dirname, '../../../uploads/' + type + '/' + id);
        if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, {recursive: true});
        }
        console.log(dirName);

        //here it meant to save the picture in the
        //corresponding folder: either chantier or user
        //if the folder does not exist create it first
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
