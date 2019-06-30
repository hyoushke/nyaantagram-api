const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');

    },
    filename: function(req, file, cb){
        
        const filename = 'post-' + Date.now() +  path.extname(file.originalname);
        req.newname = filename;
        cb(null, filename.toLowerCase());
    }

});

const fileFilter = (req, file, cb) => {

if(file.mimetype === 'image/jpg' || file.mimetype === 'image/png')
{
cb(null, true);
}
else
{
cb(null, false);
}


};                                    

const uploadPostImage = multer({storage: storage, limits: {
fileSize: 1024 * 1024 * 7,
fileFilter: fileFilter

}});

uploadPostImage.uploadSingle = uploadPostImage.single;

module.exports = uploadPostImage;



