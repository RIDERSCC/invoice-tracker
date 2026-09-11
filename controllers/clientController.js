const Client = require('../models/Client');

// GET all clients
exports.getAllClients = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const offset = (page - 1) * limit;

    const { count, rows } = await Client.findAndCountAll({
      limit,
      offset,
    });

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      clients: rows,
    });
  } catch (err) {
    next(err);
  }
};

// POST create a new client
exports.createClient = async (req, res, next) => {
  try {
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    next(err); // pass the error along to the centralized handler instead of handling it here
  }
};

// UPDATE a client
exports.updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }
    await client.update(req.body);
    res.json(client);
  } catch (err) {
    next(err);
  }
};

// DELETE a client
exports.deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      const error = new Error('Client not found');
      error.statusCode = 404;
      throw error;
    }
    await client.destroy(req.body);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};