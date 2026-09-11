const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', authenticate, invoiceController.getAllInvoices);
router.post('/',authenticate, invoiceController.createInvoice);
router.put('/:id',authenticate, invoiceController.updateInvoice);
router.delete('/:id',authenticate, requireAdmin, invoiceController.deleteInvoice);

module.exports = router;