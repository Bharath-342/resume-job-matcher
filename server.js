

const express = require("express");
const cors = require("cors");

const matchRoute = require("./routes/matchRoute");

const app = express();

app.use(cors());
app.use(express.json());


app.use("/api", matchRoute);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});