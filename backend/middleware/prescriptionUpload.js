const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/prescriptions/');
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname)
        cb(null, Date.now() + ext)
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback) {
        if (file.mimetype.startsWith('image/') || 
            file.mimetype === 'application/pdf' || 
            file.mimetype === 'application/msword' || 
            file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            callback(null, true);
        } else {
            console.log('Only images, pdf, and doc files are supported!');
            callback(null, false);
        }
    }
});

module.exports = upload;
