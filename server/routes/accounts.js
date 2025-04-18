// server/routes/accounts.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all accounts
router.get("/", async (req, res) => {
  try {
    // Fetch all accounts from the database
    const [rows] = await db.query("SELECT * FROM accounts");
    res.json(rows);
  } catch (err) {
    // Handle errors during the fetch operation
    console.error("💥 Error fetching accounts:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

// POST a new account
router.post("/", async (req, res) => {
  const {
    name,
    initial_credit,
    total_expenses,
    total_incomes,
    total_transfer_out,
    total_transfer_in,
  } = req.body;

  try {
    // Insert a new account into the database
    const [result] = await db.query(
      `INSERT INTO accounts (name, initial_credit, total_expenses, total_incomes, total_transfer_out, total_transfer_in)
         VALUES (?, ?, ?, ?, ?, ?)`,
      [
        name,
        initial_credit,
        total_expenses,
        total_incomes,
        total_transfer_out,
        total_transfer_in,
      ]
    );

    // Respond with success and the ID of the new account
    res
      .status(201)
      .json({ message: "Account added successfully", id: result.insertId });
  } catch (err) {
    // Handle errors during the insert operation
    console.error("Error inserting account:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

// DELETE an account by ID
router.delete("/:id", async (req, res) => {
  const accountId = req.params.id;
  try {
    // Delete the account from the database by ID
    const [result] = await db.query("DELETE FROM accounts WHERE id = ?", [
      accountId,
    ]);

    // Check if the account was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Account not found" });
    }

    // Respond with success
    res.json({ message: "Account deleted successfully" });
  } catch (err) {
    // Handle errors during the delete operation
    console.error("❌ Error deleting account:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
