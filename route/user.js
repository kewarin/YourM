var express = require('express'),
    router = express.Router(),
    multer = require('multer'),
    path = require('path'),
    middleware = require('../middleware');
    User        = require('../models/user');


module.exports = router;