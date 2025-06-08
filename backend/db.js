import { Pool } from "pg";

export const db = new Pool({
  user: "postgres",
  password: "Denchikkorotin120",
  host: "localhost",
  port: 5433,
  database: "database_for_course",
});

db.connect();
