const express = require("express");
const cors = require("cors");
const accountsRoutes = require("./routes/accounts");
const transactionsRoutes = require("./routes/transactions");
const categoriesRoutes = require("./routes/categories");
const subcategoriesRoutes = require("./routes/subcategories");
const authRoutes = require("./routes/auth");
require("dotenv").config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/accounts", accountsRoutes);
app.use("/api/transactions", transactionsRoutes);
app.use("/api/categories", categoriesRoutes);
app.use("/api/subcategories", subcategoriesRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
