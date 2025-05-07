const db = require("../db");

class RoutesController {
  async getRoutes(req, res) {
    const routes = await db.query("SELECT * FROM public.routes");

    res.json(routes.rows);
  }

  async deleteRoutes(req, res) {
    const route_id = req.params.route_id;
    const deleteRoutes = await db.query(
      "DELETE FROM public.routes WHERE route_id = $1",
      [route_id]
    );
    res.json(deleteRoutes.rows[0]);
  }
}

module.exports = new RoutesController();
