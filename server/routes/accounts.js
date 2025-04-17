// server/routes/accounts.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// GET all accounts
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM accounts");
    res.json(rows);
  } catch (err) {
    console.error("💥 Error fetching accounts:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
  }
});

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

    res
      .status(201)
      .json({ message: "Account added successfully", id: result.insertId });
  } catch (err) {
    console.error("Error inserting account:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

module.exports = router;
