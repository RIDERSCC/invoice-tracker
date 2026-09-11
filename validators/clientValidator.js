const Joi = require('joi');

const createClientSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{7,15}$/).allow('', null),
  company: Joi.string().max(100).allow('', null),
});

const updateClientSchema = Joi.object({
  name: Joi.string().min(2).max(100),
  email: Joi.string().email(),
  phone: Joi.string().pattern(/^[0-9+\-\s()]{7,15}$/).allow('', null),
  company: Joi.string().max(100).allow('', null),
});

module.exports = { createClientSchema, updateClientSchema };