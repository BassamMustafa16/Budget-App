// server/routes/subcategories.js
const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("here")
// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subcategories");
    res.json(rows);
  } catch (err) {
    console.log("Error Fetching subcategories");
  }
});


module.exports = router;
