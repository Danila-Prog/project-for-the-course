const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "Denchikkorotin120",
  host: "localhost",
  port: 5433,
  database: "database_for_course",
});

pool.connect();

module.exports = pool;
