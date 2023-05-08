const db = require("../db.js");

class JobController {
  async create(req, res) {
    const { name, description, salary, city, companyId } = req.body;
    const newJob = await db.query(
      `INSERT INTO public.job(
        name, description, salary, city, createdat, companyid)
        VALUES ($1, $2, $3, $4, current_date, $5) RETURNING *`,
      [name, description, salary, city, companyId]
    );
    res.json(newJob.rows[0]);
  }
  async getAllJobs(req, res) {
    let { name, companyId, city, sortOrder } = req.query;
    let jobs;
    const queryOptions = {
      companyId: companyId && !name && !city,
      name: !companyId && name && !city,
      city: !companyId && !name && city,
      cityAndName: !companyId && name && city,
      companyIdAndName: companyId && name && !city,
      companyIdAndCity: companyId && !name && city,
      default: !companyId && !name && !city,
    };
    switch (true) {
      case queryOptions.companyId:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 order by createdat desc`,
            [companyId]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 order by createdat`,
            [companyId]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 order by salary `,
            [companyId]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 order by salary desc`,
            [companyId]
          );
        } else
          jobs = await db.query(`select * from public.job where companyId=$1`, [
            companyId,
          ]);
        break;
      case queryOptions.name:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where name=$1 order by createdat desc`,
            [name]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where name=$1 order by createdat`,
            [name]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where name=$1 order by salary `,
            [name]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where name=$1 order by salary desc`,
            [name]
          );
        } else
          jobs = await db.query(`select * from public.job where name=$1`, [
            name,
          ]);
        break;
      case queryOptions.city:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where city=$1 order by createdat desc`,
            [city]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where city=$1 order by createdat`,
            [city]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where city=$1 order by salary `,
            [city]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where city=$1 order by salary desc`,
            [city]
          );
        } else
          jobs = await db.query(`select * from public.job where city=$1`, [
            city,
          ]);
        break;
      case queryOptions.cityAndName:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where city=$1 and name=$2 order by createdat desc`,
            [city, name]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where city=$1 and name=$2 order by createdat`,
            [city, name]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where city=$1 and name=$2 order by salary`,
            [city, name]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where city=$1 and name=$2 order by salary desc`,
            [city, name]
          );
        } else
          jobs = await db.query(
            `select * from public.job where city=$1 and name=$2`,
            [city, name]
          );
        break;
      case queryOptions.companyIdAndName:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and name=$2 order by createdat desc`,
            [companyId, name]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and name=$2 order by createdat`,
            [companyId, name]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and name=$2 order by salary`,
            [companyId, name]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and name=$2 order by salary desc`,
            [companyId, name]
          );
        } else
          jobs = await db.query(
            `select * from public.job where companyId=$1 and name=$2`,
            [companyId, name]
          );
        break;
      case queryOptions.companyIdAndCity:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and city=$2 order by createdat desc`,
            [companyId, city]
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and city=$2 order by createdat`,
            [companyId, city]
          );
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and city=$2 order by salary`,
            [companyId, city]
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(
            `select * from public.job where companyId=$1 and city=$2 order by salary desc`,
            [companyId, city]
          );
        } else
          jobs = await db.query(
            `select * from public.job where companyId=$1 and city=$2`,
            [companyId, city]
          );
        break;
      case queryOptions.default:
        if (sortOrder === "dd") {
          jobs = await db.query(
            `select * from public.job order by createdat desc`
          );
        } else if (sortOrder === "du") {
          jobs = await db.query(`select * from public.job order by createdat`);
        } else if (sortOrder === "su") {
          jobs = await db.query(
            `select * from public.job order by salary`
          );
        } else if (sortOrder === "sd") {
          jobs = await db.query(`select * from public.job order by salary desc`);
        } else jobs = await db.query(`select * from public.job`);
        break;
    }

    res.json({ jobs: jobs.rows, found: jobs.rows.length > 0 });
  }
  async getOneJob(req, res) {
    const { id } = req.query;
    let job = await db.query(
      `
    select * from public.job where id=$1`,
      [id]
    );
    res.json(job.rows[1]);
  }
  async delete(req, res) {
    const id = req.params.id;
    const job = await db.query(`DELETE FROM job where id =$1`, [id]);
    res.json(job.rows[0]);
  }
}

module.exports = new JobController();
