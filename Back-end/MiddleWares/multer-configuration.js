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

        destination: (req, file, callback) => {
            callback(null, path.join(`${__dirname}/../../upload`));
        },
        filename: (req, file, callback) => {
            const match = ["image/png", "image/jpeg"];
            if (match.indexOf(file.mimetype) === -1) {
                var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
                return callback(message, null);
            }
            const fileName = req.body.article.title;
            const fileExtension = MIME_TYPES[file.mimetype];
            const dateTimeGUID = Date.now();
            const userGUID = request.header("user-upload-GUID");

            callback(null, `${dateTimeGUID}@${userGUID}__${fileName}.${fileExtension}`);
        },
    });
module.exports.contentMedias = _multer({storage: contentMediaStorage}).array('content-medias',25);