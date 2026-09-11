const { Invoice, Client } = require('../models/index');

// GET all invoices
exports.getAllInvoices = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Invoice.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      invoices: rows,
    });
  } catch (err) {
    next(err);
  }
};

// POST create a new invoice
exports.createInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    next(err);
  }
};

// UPDATE an invoice
exports.updateInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      const error = new Error('Invoice not found');
      error.statusCode = 404;
      throw error;
    }
    await invoice.update(req.body);
    res.json(invoice);
  } catch (err) {
    next(err);
  }
};

// DELETE an invoice
exports.deleteInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findByPk(req.params.id);
    if (!invoice) {
      const error = new Error('Invoice not found');
      error.statusCode = 404;
      throw error;
    }
    await invoice.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

// GET a single client WITH all their invoices — this is where the relationship becomes useful
exports.getClientWithInvoices = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.clientId, {
      include: Invoice,
    });
    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }
    res.json(client);
  } catch (err) {
    next(err);
  }
};