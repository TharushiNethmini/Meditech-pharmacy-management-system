const express = require("express");
const router = express.Router();
const connection = require("../db");

// For pass assigns
router.get("/", (req, res) => {

    let assign_details = [];
    connection.query('SELECT Invoice_ID, NIC, Date, Porter_ID, Status FROM assign WHERE Invoice_ID NOT IN (SELECT Invoice_ID FROM history)', (error, results, fields) => {
        if (error) throw error;
        assign_details = results;

        res.json({ assigns: assign_details });
    });

});

// For pass invoice details
router.post("/invoiceDetails", (req, res) => {
    const { invoice_id } = req.body;
    let invoice_details = [];
    connection.query(`SELECT Invoice_ID, NIC, Date, Porter_ID, Status FROM assign WHERE Invoice_ID = '${invoice_id}'`, (error, results, fields) => {
        if (error) throw error;
        invoice_details = results;

        res.json({ invoice_details: invoice_details });
    });

});

// For delete invoice recode
router.post("/delete", (req, res) => {
    const { invoice_id } = req.body;
    connection.query(`DELETE FROM assign WHERE Invoice_ID = ${invoice_id}`, (error, results, fields) => {

        if (error) {
            res.json({ status: "error", msg: "Record not deleted. Try again later! "+ error });
        } else {
            res.json({ status: "success", msg: "Record delete successful!" });
        }

    });

});

// For update invoice recode
router.post("/update", (req, res) => {

    const { porter_id, status, invoice_id } = req.body;
    connection.query(`UPDATE assign SET Porter_ID = '${porter_id}', Status = '${status}' WHERE Invoice_ID = '${invoice_id}'`
        , (error, results, fields) => {

            if (error) {
                res.json({ status: "error", msg: "Record not updated. Try again later!" });
            } else {
                res.json({ status: "success", msg: "Record update successful!" });
            }

        });

});

// validations For insert to history recode
router.post("/insert", (req, res) => {
    const { invoice_id, nic, date, porter_id, status } = req.body;

    if (porter_id != ''){

        if (status == 'returned' || status == 'delivered'){

            connection.query(`INSERT INTO history (Invoice_ID, NIC, Date, Porter_ID) VALUES ('${invoice_id}', '${nic}', '${date}', '${porter_id}')`
                , (error, results, fields) => {

                    if (error) {
                        res.json({ status: "error", msg: "Record not proceed. Try again later!" });
                    } else {
                        res.json({ status: "success", msg: "Record proceed successful!" });
                    }

                });
        }
        else {
            res.json({ status: "error", msg: "Still not delivered or returned!" });
        }
    }
    else {
        res.json({ status: "error", msg: "Please assign a porter!" });
    }
});

module.exports = router;