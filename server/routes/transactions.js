// server/routes/accounts.js
const express = require("express");
const router = express.Router();
const db = require("../db");

const handleTransaction = require("../utils/transactionHandler");

// GET all transactions
router.get("/", async (req, res) => {
  try {
    // Fetch all transactions from the database
    const [rows] = await db.query("SELECT * FROM transactions");
    res.json(rows);
  } catch (err) {
    // Handle errors during the fetch operation
    console.error("💥 Error fetching transactions:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// POST a new transaction
router.post("/", async (req, res) => {
  const {
    date,
    category,
    subcategory,
    type,
    account,
    amount,
    label,
    description,
  } = req.body;

  try {
    // Insert the new transaction into the database
    const [result] = await db.query(
      `INSERT INTO transactions (date,
    category,
    subcategory,
    type,
    account,
    amount,
    label,
    description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [date, category, subcategory, type, account, amount, label, description]
    );

    // Use the utility function to update account balances
    await handleTransaction(type, account, amount, "Add");

    // Respond with success and the ID of the new transaction
    res
      .status(201)
      .json({ message: "Transaction added successfully", id: result.insertId });
  } catch (err) {
    // Handle errors during the insert operation
    console.error("Error inserting Transaction:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

// DELETE a transaction by ID
router.delete("/:id", async (req, res) => {
  const transactionId = req.params.id;
  try {
    // Fetch the transaction details to determine its type, account, and amount
    const [transactionRows] = await db.query(
      "SELECT * FROM transactions WHERE id = ?",
      [transactionId]
    );

    // Extract transaction details
    const { type, account, amount } = transactionRows[0];

    // Use the utility function to update account balances
    await handleTransaction(type, account, amount, "Delete");

    // Delete the transaction from the database
    const [result] = await db.query("DELETE FROM transactions WHERE id = ?", [
      transactionId,
    ]);

    // Check if the transaction was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Respond with success
    res.json({ message: "Transaction deleted successfully" });
  } catch (err) {
    // Handle errors during the delete operation
    console.error("❌ Error deleting transaction:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
