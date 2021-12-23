require("dotenv").config();
const cors = require("cors");
const express = require("express");

const connection = require("./db");
connection.connect();
const app = express();

const PORT = process.env.PORT || 3008;

// Middleware
app.use(cors());
app.use(express.json());

// Import routes
const assigns_router = require("./routes/assigns");
const history_router = require("./routes/history");
const orders_router = require("./routes/orders");
const porters_router = require("./routes/porters");
const report_router = require("./routes/report");

// Use routes
app.use("/assigns", assigns_router);
app.use("/history", history_router);
app.use("/orders", orders_router);
app.use("/porters", porters_router);
app.use("/report", report_router);

// Server run
app.listen(PORT, () => {
    console.log("server is running");
});