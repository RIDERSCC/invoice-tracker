const Client = require('../models/Client');

// GET all clients
exports.getAllClients = async(req,res) => {
 try {
    const clients = await Client.findAll();
    res.json(clients); 
    } catch(err){
    res.status(500).json({ error: err.message });
    }
};

// POST create a new client
exports.createClient = async (req,res) => {
    try{
     const client = await Client.create(req.body);
     res.status(201).json(client);
    }catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// UPDATE a client
exports.updateClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    await client.update(req.body);
    res.json(client);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE a client
exports.deleteClient = async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Client not found' });
    }
    await client.destroy();
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};