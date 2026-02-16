import { Pool, types } from "pg";

types.setTypeParser(1082, (value) => value);

export const db = new Pool({
  user: "postgres",
  password: "Denchikkorotin120",
  host: "localhost",
  port: 5432,
  database: "database-for-course",
});

db.connect();
