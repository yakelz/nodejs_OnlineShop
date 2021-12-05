const express = require ('express');
const router = express.Router(); 
const aboutController = require('../controllers/aboutController');

router.get ('/privacy', aboutController.privacy_get);

module.exports = router;