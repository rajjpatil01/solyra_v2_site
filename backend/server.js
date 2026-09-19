require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 5000;

app.use(cors());

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

app.get("/", (req, res) => {
    res.send("Solyra Backend is running!");
});

app.get("/test-db", async (req, res) => {
    try {
        const result = await pool.query("SELECT NOW()");

        res.json({
            message: "Solyra database connected!",
            time: result.rows[0].now
        });

    } catch (error) {
        console.error("Database connection error:", error);

        res.status(500).json({
            message: "Database connection failed"
        });
    }
});

app.get("/api/products", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM products WHERE is_active = TRUE ORDER BY id ASC"
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error fetching products:", error);

        res.status(500).json({
            message: "Failed to fetch products"
        });
    }
});

app.listen(PORT, () => {
    console.log(`Solyra Backend running on http://localhost:${PORT}`);
});