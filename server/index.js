const express = require('express');
const cors = require('cors');
const accountsRoutes = require('./routes/accounts');
const transactionsRoutes = require('./routes/transactions');
require('dotenv').config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/accounts', accountsRoutes);
app.use('/api/transactions', transactionsRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
