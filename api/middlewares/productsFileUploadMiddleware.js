const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/');

    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
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

const uploadProduct = multer({storage: storage, limits: {
fileSize: 1024 * 1024 * 7,
fileFilter: fileFilter

}});

uploadProduct.uploadSingle = uploadProduct.single;

//uploadProduct.uploadFile = (uploadType, filename)=>{
//
//    if(uploadType == 'single'){
//        this.single(filename);
//        this.single(filename);
//    }
//
//}
module.exports = uploadProduct;



