import express from "express";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../auth.middleware.js";
import { db } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/login", async (req, res) => {
  const { login, password } = req.body;

  const userRow = await db.query("SELECT * FROM users WHERE username = $1", [
    login,
  ]);

  const user = userRow.rows[0];

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // const isValid = await bcrypt.compare(password, user.password);
  const isValid = password === user.password;

  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    {
      userId: user.user_id,
      roleId: user.role_id,
      username: user.username,
      email: user.email,
      name: user.name,
      surname: user.surname,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });

  res.json({ success: true });
});

router.post("/logout", (req, res) => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  res.status(200).json({ success: true });
});

router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

export default router;
