import { Pool, types } from "pg";
import dotenv from "dotenv";

dotenv.config();

types.setTypeParser(1082, (value) => value);

export const db = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  max: Number(process.env.DB_MAX_CONNECTIONS), // макс. количество соединений в пуле
  idleTimeoutMillis: Number(process.env.DB_IDLE_TIMEOUT), // время простоя до закрытия соединения
  connectionTimeoutMillis: Number(process.env.DB_CONNECTION_TIMEOUT), // время ожидания свободного соединения из пула
  maxUses: Number(process.env.DB_MAX_USES), // сколько запросов может прогнать одно соединение перед закрытием
});

db.connect();
