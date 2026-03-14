const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // Render / Production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    },
    max: 10, // max number of connections
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 5000 // return error after 5 seconds if cannot connect
  });
} else {
  // Local PostgreSQL
  pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "resume_matcher",
    password: "post",
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 5000
  });
}

pool.on("connect", () => {
  console.log("PostgreSQL connected");
});

pool.on("error", (err) => {
  console.error("Unexpected DB error", err);
});

module.exports = pool;