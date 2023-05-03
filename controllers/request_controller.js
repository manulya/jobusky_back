const db = require("../db.js");

class RequestController {
  
  async create(req, res) {
    const {userid, jobid} = req.body;
    const newRequest = await db.query(
      `INSERT INTO public.requests(
        userid, jobid)
        VALUES ($1, $2) RETURNING *`, 
      [userid, jobid]
    );
    res.json(newRequest.rows[0]);
  }
  async getAllRequests(req, res) {
    const userid = req.params.userId;
      const requests=await db.query(`
      select * from public.requests where userid=$1`, [userid])
      res.json(requests.rows);
  }
  async delete(req, res) {
    const id = req.params.id;
      const request = await db.query(`DELETE FROM public.requests where id =$1`, [id]);
      res.json(request.rows[0]);
  }

}

module.exports = new RequestController();
