const db = require("../db.js");
const ApiError = require("../error/ApiError.js");

class SkillsController {
  async create(req, res) {
    const { name, level, job_id } = req.body;
    const newSkill = await db.query(
      `INSERT INTO public.skills(
        name, level, job_id)
        VALUES ($1,$2, $3) RETURNING *`,
      [name, level, job_id]
    );
    res.json(newSkill.rows[0]);
  }
  async get(req, res) {
    let { job_id } = req.query;

    const skills = await db.query(
      `SELECT * FROM public.skills where job_id=$1 `,
      [job_id]
    );

    res.json(skills.rows);
  }
}

module.exports = new SkillsController();
