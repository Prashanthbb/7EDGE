const express = require('express');
const router = express.Router();
var path = require('path');


const main_controller = require('../controller/main.controller');


router.get('/test', main_controller.test);
module.exports = router;
