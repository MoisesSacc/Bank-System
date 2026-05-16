const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/auth.middleware');
const {createTransaction, getTransactions, transfer} = require('../controllers/transaction.controller');

router.post('/create', verifyToken, createTransaction);
router.post('/transfer', verifyToken, transfer);
router.get('/:cuentaId', verifyToken, getTransactions);
module.exports = router;