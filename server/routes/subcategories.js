// server/routes/subcategories.js
const express = require("express");
const router = express.Router();
const db = require("../db");

console.log("here");
// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM subcategories");
    res.json(rows);
  } catch (err) {
    console.log("Error Fetching subcategories");
  }
});

router.delete("/:id", async (req, res) => {
  const subcategoryId = req.params.id;
  try {
    const [result] = await db.query("DELETE FROM subcategories WHERE id = ?", [
      subcategoryId,
    ]);

    // Check if the subcategory was found and deleted
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Subcategory not found" });
    }

    // Respond with success
    res.json({ message: "Subcategory deleted successfully" });
  } catch (err) {
    console.log(`Subcategory Delete Faild - ${err}`);
  }
});

router.post("/", async (req, res) => {
  const { subcategoryName, categoryId } = req.body;
  if (!subcategoryName || !categoryId) {
    return res.status(400).json({ error: "name and category_id are required" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO subcategories (name, category_id) VALUES (?, ?)",
      [subcategoryName, categoryId]
    );

    res.status(201).json({
      message: "Subcategory added successfully",
      id: result.insertId,
    });
  } catch (err) {
    console.error("Error adding subcategory:", err);
    res.status(500).json({ error: "Database insert failed" });
  }
});
module.exports = router;
