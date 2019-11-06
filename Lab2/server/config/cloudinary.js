import {
    config,
    uploader
} from 'cloudinary';

const cloudinaryConfig = (req, res, next) => {
    config({
        cloud_name: 'ds8wtzdoe',
        api_key: '621293452131651',
        api_secret: 'qneJcVkGY04fYgq6Ip5MnU1pBRQ',
    })
    next()
}
export {
    cloudinaryConfig,
    uploader
};