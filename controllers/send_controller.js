const db = require("../db.js");
const ApiError = require("../error/ApiError.js");

class SendController {
  async create(req, res,next) {
    const { user_id, job_id, message } = req.body;
    
    const candidate = await db.query(
      `select * from public.sended where user_id=$1 and job_id=$2`,
      [user_id, job_id]
    );
    if (candidate.rowCount) {
      return next(
        ApiError.badRequest("Заявка с таким пользователем и вакансией уже существует")
      );
    }
    const newSend = await db.query(
      `INSERT INTO public.sended(
        user_id, job_id, message, updated_at)
        VALUES ($1, $2, $3, current_date)
        RETURNING *`,
      [user_id, job_id, message]
    );
    res.json(newSend.rows[0]);
  }
  async getAll(req, res) {
    const {user_id} = req.query;
    const sended = await db.query(
      `
      select * from public.sended
      where user_id=$1`,
      [user_id]
    );
    res.json(sended.rows);
  }
  async update(req, res) {
    const { id, message } = req.body;
    var now = new Date();
    const sended = await db.query(
      `UPDATE public.sended set message=$1, updated_at=$2 where id =$3 RETURNING*`,
      [message, now, id]
    );
    res.json(sended.rows[0]);
  }
}

module.exports = new SendController();
