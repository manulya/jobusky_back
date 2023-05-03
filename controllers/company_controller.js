const db = require("../db.js");
const uuid = require('uuid')
const path = require('path')
const ApiError = require('../error/ApiError.js')

class CompanyController {

  async create(req, res,next) {
    try {
    const {name, description}=req.body;
    const {img} = req.files
    let fileName = uuid.v4()+".jpg"
    img.mv(path.resolve(__dirname,'..','static', fileName))
    const newCompany=await db.query(
    `INSERT INTO public.companies(
      name, description, img, createdat)
      VALUES ($1, $2, $3,current_date) RETURNING *`,
      [name, description, fileName]
    );
    res.json(newCompany.rows[0]);
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
    
  }
  async getAll(req, res) {
      const companies = await db.query(`SELECT * FROM companies`);
      res.json(companies.rows);
  }
  async getOne(req, res) {
    const id=req.params.id
    const company = await db.query(`SELECT * FROM companies where id=$1`,[id]);
    res.json(company.rows[0]);
  }
  async update(req, res) {
    const {id,name, description, address}=req.body;
    const {img} = req.files
    let fileName = uuid.v4()+".jpg"
    img.mv(path.resolve(__dirname,'..','static', fileName))
    var now = new Date();
    const user = await db.query(
      `UPDATE companies set name=$1, description=$2, img=$3, updatedAt=$4 where id =$5 RETURNING*`,
      [name, description,fileName,now,id]
    );
    res.json(user.rows[0]);
  }
  async delete(req, res) {
      const id = req.params.id;
      const company = await db.query(`DELETE FROM companies where id =$1`, [id]);
      res.json(company.rows[0]);

  }

}

module.exports = new CompanyController();
