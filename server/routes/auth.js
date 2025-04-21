const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
router.post("/register", async (req, res) => {
  const { first_name, last_name, username, email, password } = req.body;

  if (!first_name || !last_name || !username || !email || !password) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const [result] = await db.query(
      `INSERT INTO users (first_name, last_name, username, email, password)
       VALUES (?, ?, ?, ?, ?)`,
      [first_name, last_name, username, email, hashedPassword]
    );

    res
      .status(201)
      .json({
        message: "User registered successfully",
        userId: result.insertId,
      });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user." });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const [users] = await db.query("SELECT * FROM users WHERE username = ?", [
      username,
    ]);

    if (users.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: "Invalid credentials" });

    // Optional: generate a token
    const token = jwt.sign({ id: user.user_id }, "1612", {
      expiresIn: "1d",
    });

    res.json({ message: "Login successful", token, userId: user.user_id, firstName:  user.first_name});
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

module.exports = router;
