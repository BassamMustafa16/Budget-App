// routes/products.js
const express = require('express');
const router = express.Router();

// Define a route
router.get('/', (req, res) => {
    res.send('this is transactions route');// this gets executed when user visit http://localhost:2000/transactions
});

router.get('/101', (req, res) => {
    res.send('this is transactions 101 route');// this gets executed when user visit http://localhost:2000/transactions/101
});

router.get('/102', (req, res) => {
    res.send('this is transactions 102 route');// this gets executed when user visit http://localhost:2000/transactions/102
});

// export the router module so that server.js file can use it
module.exports = router;