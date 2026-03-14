

const express = require("express");
const cors = require("cors");

const matchRoute = require("./routes/matchRoute");

const app = express();

app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Resume Job Matcher API is running");
});
app.use("/api", matchRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


const pool = require("./config/db");

pool.query("SELECT NOW()", (err, res) => {
  if (err) console.log("DB ERROR", err);
  else console.log("DB Connected:", res.rows);
});