// server/routes/accounts.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const authenticateToken = require("../middleware/auth");

// Get all categories
router.get("/", authenticateToken, async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM categories WHERE user_id = ? ORDER BY id;",
      [req.user.id]
    );

    res.json(rows);
  } catch (err) {
    console.log("Error Fetching categories");
  }
});

router.post("/", authenticateToken, async (req, res) => {
  const { categoryName } = req.body;
  if (!categoryName) {
    return res.status(400).json({ error: "Category name is required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO categories (name, user_id) VALUES (?, ?)",
      [categoryName, req.user.id]
    );

    res.status(201).json({
      message: "Category added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error adding Category:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});

module.exports = router;
