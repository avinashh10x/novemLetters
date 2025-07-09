const express = require('express');
const { userRegistration } = require('../controllers/userControllers');
const { hello } = require('../controllers/letterControllers');

const router = express.Router();

router.post('/register', userRegistration);
router.get('/hello', hello)




module.exports = router;
