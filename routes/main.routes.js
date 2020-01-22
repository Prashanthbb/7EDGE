const express = require('express');
const router = express.Router();
var path = require('path');


const main_controller = require('../controller/main.controller');


router.post('/create', main_controller.employee_create);
router.post('/delete_employee',main_controller.employee_delete);

module.exports = router;
