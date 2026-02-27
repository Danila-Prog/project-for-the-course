import express from "express";
import userRouter from "./routes/users.routes.js";
import driversRouter from "./routes/drivers.router.js";
import vehiclesRouter from "./routes/vehicles.router.js";
import vehiclesTypeRouter from "./routes/vehiclesType.router.js";
import historyRoutes from "./routes/historyRoute.router.js";
import routesRouter from "./routes/routes.router.js";
import authRouter from "./routes/auth.routes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

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

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

app.post("/send-email", async (req, res) => {
  try {
    const { to, subject, html } = req.body;
    if (!to || !subject || !html)
      return res.status(400).json({ message: "Missing fields" });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to,
      subject,
      html,
    });

    res.json({ message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to send email" });
  }
});

app.use("/api", userRouter);
app.use("/api", driversRouter);
app.use("/api", vehiclesRouter);
app.use("/api", routesRouter);
app.use("/api/vehicles", vehiclesTypeRouter);
app.use("/api", historyRoutes);
app.use("/api", authRouter);
app.listen(PORT, () => console.log(`server start on ${PORT}`));
