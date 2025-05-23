const express = require("express");
const userRouter = require("./routes/users.routes");
const companiesRouter = require("./routes/companies.router");
const driversRouter = require("./routes/drivers.router");
const vehiclesRouter = require("./routes/vehicles.router");
const vehiclesTypeRouter = require("./routes/vehiclesType.router");
const routesRouter = require("./routes/routes.router");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/api", userRouter);
app.use("/api", companiesRouter);
app.use("/api", driversRouter);
app.use("/api", vehiclesRouter);
app.use("/api", routesRouter);
app.use("/api/vehicles", vehiclesTypeRouter);
app.listen(PORT, () => console.log(`server start on ${PORT}`));
