const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  
  // Bearer <token>
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  jwt.verify(token, "1612", (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid or expired token." });
    
    // Token is valid
    req.user = user; // you can now access user info in your routes
    next();
  });
};

module.exports = authenticateToken;
