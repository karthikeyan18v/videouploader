// strmly-backend/src/routes/video.routes.js
const router     = require('express').Router();
const auth       = require('../middleware/auth');
const { storage }= require('../config/cloudinary');
const multer     = require('multer');
const videosCtrl = require('../controllers/videos.controller');

const upload = multer({ storage }).single('video');

router.post('/upload', auth, upload, videosCtrl.upload);
router.get('/', videosCtrl.list);

module.exports = router;
