const express = require('express');

const router = express.Router();

const verifyToken = require('../middlewares/auth.middleware');

const { createAccount } = require('../controllers/account.controller');

router.post('/create', verifyToken, createAccount);

module.exports = router;