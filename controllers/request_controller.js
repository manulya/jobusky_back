const db = require("../db.js");
const ApiError = require("../error/ApiError.js");

class RequestController {
  async create(req, res, next) {
    const { userid, jobid } = req.body;

    const candidate = await db.query(
      `select * from public.requests where userid=$1 and jobid=$2`,
      [userid, jobid]
    );
    if (candidate.rowCount) {
      return next(
        ApiError.badRequest(
          "Заявка с таким пользователем и вакансией уже существует"
        )
      );
    }
    const newRequest = await db.query(
      `INSERT INTO public.requests(userid, jobid) VALUES ($1, $2) RETURNING *`,
      [userid, jobid]
    );
    res.json(newRequest.rows[0]);
  }

  async getAllRequests(req, res) {
    const userid = req.params.userId;
    const requests = await db.query(
      `
      select * from public.requests where userid=$1`,
      [userid]
    );
    res.json(requests.rows);
  }
  async delete(req, res) {
    const id = req.params.id;
    const request = await db.query(`DELETE FROM public.requests where id =$1`, [
      id,
    ]);
    res.json(request.rows[0]);
  }
}

module.exports = new RequestController();
