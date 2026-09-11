const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  invoiceNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'overdue'),
    defaultValue: 'pending',
  },
  dueDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

module.exports = Invoice;