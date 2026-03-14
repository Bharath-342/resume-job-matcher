const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",
  host: "host.docker.internal",
  database: "resume_matcher",
  password: "post",
  port: 5432
});

module.exports = pool;