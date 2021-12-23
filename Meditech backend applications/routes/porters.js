const express = require("express");
const router = express.Router();
const connection = require("../db");

// For pass porter ids
router.get("/", (req, res) => {

    let porter_ids = [];
    connection.query('SELECT Porter_ID from porter', (error, results, fields) => {
        if (error) throw error;
        porter_ids = results;

        res.json({ porters: porter_ids });
    });

});

// For pass porters details
router.get("/details", (req, res) => {

    let porters_details = [];
    connection.query('SELECT Porter_ID,First_Name,Last_Name,NIC,Phone FROM porter', (error, results, fields) => {
        if (error) throw error;
        porters_details = results;

        res.json({ porters: porters_details });
    });

});

module.exports = router;