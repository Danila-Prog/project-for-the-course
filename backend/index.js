import express from "express";
import userRouter from "./routes/users.routes.js";
import driversRouter from "./routes/drivers.router.js";
import vehiclesRouter from "./routes/vehicles.router.js";
import vehiclesTypeRouter from "./routes/vehiclesType.router.js";
import routesRouter from "./routes/routes.router.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

app.use("/api", userRouter);
app.use("/api", driversRouter);
app.use("/api", vehiclesRouter);
app.use("/api", routesRouter);
app.use("/api/vehicles", vehiclesTypeRouter);
app.listen(PORT, () => console.log(`server start on ${PORT}`));
