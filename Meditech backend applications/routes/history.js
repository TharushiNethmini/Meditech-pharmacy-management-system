const express = require("express");
const router = express.Router();
const connection = require("../db");

// For pass history
router.get("/", (req, res) => {

    let history_details = [];
    connection.query('SELECT Invoice_ID, NIC, Date, Porter_ID FROM history', (error, results, fields) => {
        if (error) throw error;
        history_details = results;

        res.json({ history: history_details });
    });

});

module.exports = router;