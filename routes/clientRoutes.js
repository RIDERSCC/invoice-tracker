const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const invoiceController = require('../controllers/invoiceController');
const { authenticate, requireAdmin } = require('../middleware/auth');
const validate = require('../middleware/validate');
const { createClientSchema, updateClientSchema } = require('../validators/clientValidator');

router.get('/', authenticate, clientController.getAllClients);
router.post('/', authenticate, validate(createClientSchema), clientController.createClient);
router.put('/:id', authenticate, validate(updateClientSchema),clientController.updateClient);
router.delete('/:id', authenticate, requireAdmin, clientController.deleteClient);
router.get('/:clientId/invoices',authenticate, require('../controllers/invoiceController').getClientWithInvoices);

module.exports = router;