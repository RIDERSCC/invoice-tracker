const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createInvoiceSchema, updateInvoiceSchema } = require('../validators/invoiceValidator');

router.get('/', authenticate, invoiceController.getAllInvoices);
router.post('/', authenticate, validate(createInvoiceSchema), invoiceController.createInvoice);
router.put('/:id', authenticate, validate(updateInvoiceSchema), invoiceController.updateInvoice);
router.delete('/:id',authenticate, requireAdmin, invoiceController.deleteInvoice);

module.exports = router;