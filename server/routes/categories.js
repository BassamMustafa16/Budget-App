// server/routes/accounts.js
const express = require("express");
const router = express.Router();
const db = require("../db");
const { route } = require("./accounts");

console.log("here")
// Get all categories
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM categories ORDER BY id;");
    res.json(rows);
  } catch (err) {
    console.log("Error Fetching categories");
  }
});

module.exports = router;
