const express = require("express");
const pool = require("./config/db");
const matchRoutes = require("./routes/matchRoute");

const app = express();
app.use(express.json());

app.get("/api/status", (req, res) => {
  res.json({
    message: "Resume parser and JD parser API is running successfully",
    server: "OK",
    time: new Date()
  });
});

app.use("/api", matchRoutes);

async function startServer() {
  try {

    // create table automatically
    await pool.query(`
      CREATE TABLE IF NOT EXISTS match_results (
        id SERIAL PRIMARY KEY,
        name TEXT,
        experience INT,
        salary TEXT,
        resume_skills TEXT,
        matching_score INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("Table ready");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log("Server running on port", PORT);
    });

  } catch (error) {
    console.error("DB ERROR", error);
  }
}

startServer();