const pool = require("./config/db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.log("Database connection failed:", err);
  } else {
    console.log("Database connected:", res.rows);
  }

  pool.end();
});