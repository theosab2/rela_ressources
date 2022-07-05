const _multer = require('multer');
const __artContentsDirname = "./Assets/Uploads/Image/Article/";

const MIME_TYPES = {
    'image/jpg' : 'jpg',
    'image/jpeg' : 'jpg',
    'image/png' : 'png'
};

const articleImageStorage = _multer.diskStorage({

    destination: (request, file, callback) => {
        callback(null /* TODO : insert error handling */, ('./Assets/Uploads/Image/Article/'));
    },
    filename: (request, file, callback) => {
        const fileName = file.originalname.split(' ').join('_').split('.')[0];
        const fileExtension = MIME_TYPES[file.mimetype];
        const dateTimeGUID = Date.now();
        const userGUID = request.header("user-upload-GUID");

        callback(null, `${dateTimeGUID}@${userGUID}__${fileName}.${fileExtension}`);
        
    },
});
module.exports.articleImage = _multer({storage: articleImageStorage}).single('article-image');


const userAvatarStorage = _multer.diskStorage({

    destination: (request, file, callback) => {
        callback(null /* TODO : insert error handling */, ('./Assets/Uploads/Image/Avatar/'));
    },
    filename: (request, file, callback) => {
        const fileName = file.originalname.split(' ').join('_').split('.')[0];
        const fileExtension = MIME_TYPES[file.mimetype];
        const dateTimeGUID = Date.now();
        const userGUID = request.header("user-upload-GUID");

        callback(null, `${dateTimeGUID}@${userGUID}__${fileName}.${fileExtension}`);
        
    },
});
module.exports.avatarImage = _multer({storage: userAvatarStorage}).single('avatar-image');

const contentMediaStorage = _multer.diskStorage({

    destination: (request, file, callback) => {
        callback(null /* TODO : insert error handling */, ('./Assets/Uploads/ContentsMedias/'));
    },
    filename: (request, file, callback) => {
        const fileName = file.originalname.split(' ').join('_').split('.')[0];
        const fileExtension = MIME_TYPES[file.mimetype];
        const dateTimeGUID = Date.now();
        const userGUID = request.header("user-upload-GUID");

        callback(null, `${dateTimeGUID}@${userGUID}__${fileName}.${fileExtension}`);
    },
});
module.exports.contentMedia = _multer({storage: articleImageStorage}).single('content-media');