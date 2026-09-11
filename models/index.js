const sequelize = require('../config/database');
const Client = require('./Client');
const Invoice = require('./Invoice');
const User = require('./User');

// A Client has many Invoices
Client.hasMany(Invoice, { foreignKey: 'clientId' });

// An Invoice belongs to one Client
Invoice.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = { sequelize, Client, Invoice,User };