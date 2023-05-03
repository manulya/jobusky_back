const db = require("../db.js");

class JobController {
  
  async create(req, res) {
    const {name, description, salary, city, companyId} = req.body;
    const newJob = await db.query(
      `INSERT INTO public.job(
        name, description, salary, city, createdat, companyid)
        VALUES ($1, $2, $3, $4, current_date, $5) RETURNING *`, 
      [name, description, salary, city, companyId]
    );
    res.json(newJob.rows[0]);
  }
  async getAllJobs(req, res) {
    let {name, companyId, city} = req.query
    let jobs;
    if(companyId && !name && !city){
      jobs=await db.query(`
      select * from public.job where companyId=$1`,[companyId])
    }
    if(!companyId && name && !city){
      jobs=await db.query(`
      select * from public.job where name=$1`,[name])
    }
    if(!companyId && !name && city){
      jobs=await db.query(`
      select * from public.job where city=$1`,[city])
    }
    if(!companyId && name && city){
      jobs=await db.query(`
      select * from public.job where city=$1 and name=$2`,[city, name])
    }
    if(companyId && name && !city){
      jobs=await db.query(`
      select * from public.job where companyId=$1 and name=$2`,[companyId, name])
    }
    if(companyId && !name && city){
      jobs=await db.query(`
      select * from public.job where companyId=$1 and city=$2`,[companyId, city])
      }
    if(!companyId && !name && !city){
      jobs=await db.query(`
      select * from public.job`)
    }
    res.json({jobs: jobs.rows, found: jobs.rows.length > 0});
    

  }
  async getOneJob(req, res) {
    const {id}=req.query
    let job=await db.query(`
    select * from public.job where id=$1`,[id])
    res.json(job.rows[1]);

  
  }
  async delete(req, res) {
    const id = req.params.id;
      const job = await db.query(`DELETE FROM job where id =$1`, [id]);
      res.json(job.rows[0]);

  }

}

module.exports = new JobController();
