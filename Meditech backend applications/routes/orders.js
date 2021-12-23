const express = require("express");
const router = express.Router();
const connection = require("../db");

// For pass history count
router.get("/historyCount", (req, res) => {

    let historyCount = [];
    connection.query('SELECT count(*) as historyCount FROM history', (error, results, fields) => {
        if (error) throw error;
        historyCount = results;
        // connection.end();
        res.json({ historyCount: historyCount });
    });

});

// For pass pending count ids
router.get("/pendingCount", (req, res) => {

    let pendingCount = [];
    connection.query(`SELECT COUNT(*) as pendingCount FROM assign WHERE Status = 'pending'`, (error, results, fields) => {
        if (error) throw error;
        pendingCount = results;
        // connection.end();
        res.json({ pendingCount: pendingCount });
    });

});

// For pass assigned count ids
router.get("/assignedCount", (req, res) => {

    let assignedCount = [];
    connection.query(`SELECT COUNT(*) as assignedCount FROM assign WHERE Status = 'assigned'`, (error, results, fields) => {
        if (error) throw error;
        assignedCount = results;
        // connection.end();
        res.json({ assignedCount: assignedCount });
    });

});

// For pass delivered count ids
router.get("/deliveredCount", (req, res) => {

    let deliveredCount = [];
    connection.query(`SELECT COUNT(*) as deliveredCount FROM assign WHERE Status = 'delivered'`, (error, results, fields) => {
        if (error) throw error;
        deliveredCount = results;
        // connection.end();
        res.json({ deliveredCount: deliveredCount });
    });

});

// For pass returned count ids
router.get("/returnedCount", (req, res) => {

    let returnedCount = [];
    connection.query(`SELECT COUNT(*) as returnedCount FROM assign WHERE Status = 'returned'`, (error, results, fields) => {
        if (error) throw error;
        returnedCount = results;

        res.json({ returnedCount: returnedCount });
    });

});

module.exports = router;