const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController.js');

router.post('/process', dataController.processCSV);

module.exports = router;
