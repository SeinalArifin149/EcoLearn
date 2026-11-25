
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const db = require("./config/database");

const app = express();

app.use(cors());
app.use(express.json());

// Test API
app.get("/", (req, res) => {
  res.json({
    message: "EcoLearn API berjalan!"
  });
});

// Test koneksi PostgreSQL
app.get("/api/health/database", async (req, res) => {
  try {
    const result = await db.query("SELECT NOW()");

    res.json({
      status: "success",
      message: "Database Neon terhubung!",
      time: result.rows[0].now
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Database tidak dapat dihubungkan"
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`EcoLearn API running on port ${PORT}`);
});
