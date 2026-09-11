const Joi = require('joi');

const createInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string().required(),
  amount: Joi.number().positive().required(),
  status: Joi.string().valid('pending', 'paid', 'overdue'),
  dueDate: Joi.date().required(),
  clientId: Joi.number().integer().required(),
});

const updateInvoiceSchema = Joi.object({
  invoiceNumber: Joi.string(),
  amount: Joi.number().positive(),
  status: Joi.string().valid('pending', 'paid', 'overdue'),
  dueDate: Joi.date(),
  clientId: Joi.number().integer(),
});

module.exports = { createInvoiceSchema, updateInvoiceSchema };