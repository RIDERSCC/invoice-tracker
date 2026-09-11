const { Invoice, Client } = require('../models/index');

// GET all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create a new invoice
exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE an invoice
exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    await invoice.update(req.body);
    res.json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE an invoice
exports.deleteInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      return res.status(404).json({ error: 'Invoice not found' });
    }
    await invoice.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET a single client WITH all their invoices — this is where the relationship becomes useful
exports.getClientWithInvoices = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.clientId, {
      include: Invoice,
    });
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    res.json(client);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};