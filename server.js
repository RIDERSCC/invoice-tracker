const express = require('express');
const { sequelize, Client, Invoice } = require('./models/index');
const clientRoutes = require('./routes/clientRoutes');
const errorHandler = require('./middleware/errorHandler');
const app = express();

const PORT = process.env.PORT || 3000;

// app.use((req, res, next) => {
//   console.log(`${req.method} request to ${req.url}`);
//   next();
// });

app.get('/',(req,res) => {
res.send('Invoice Tracker API is running');
})

// Test DB connection
sequelize.authenticate()
  .then(() => console.log('MySQL connected successfully'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

sequelize.sync()
  .then(() => console.log('Models synced to database'))
  .catch((err) => console.error('Error syncing models:', err));

app.listen(PORT,() => {
console.log(`Server running on http://localhost:${PORT}`);
})

app.use(express.json()); // needed so Express can parse JSON request bodies — add this BEFORE your routes
app.use('/clients', clientRoutes);

const invoiceRoutes = require('./routes/invoiceRoutes');
app.use('/invoices', invoiceRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

app.use(errorHandler); // must be the very last app.use()