const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const invoiceController = require('../controllers/invoiceController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', authenticate, clientController.getAllClients);
router.post('/', authenticate, clientController.createClient);
router.put('/:id', authenticate, clientController.updateClient);
router.delete('/:id', authenticate, requireAdmin, clientController.deleteClient);
router.get('/:clientId/invoices',authenticate, require('../controllers/invoiceController').getClientWithInvoices);

module.exports = router;