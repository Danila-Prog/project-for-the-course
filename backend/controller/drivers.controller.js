const db = require("../db");

class DriversController {
  async getDrivers(req, res) {
    const drivers = await db.query("SELECT * FROM public.drivers");

    res.json(drivers.rows);
  }
  async changingStatus(req, res) {
    const { driver_id, status_driver_id } = req.body;

    const updatedDriver = await db.query(
      "UPDATE public.drivers SET status_driver_id = $1 WHERE driver_id = $2 RETURNING *",
      [status_driver_id, driver_id]
    );
    res.json(updatedDriver.rows[0]);
  }
}

module.exports = new DriversController();
