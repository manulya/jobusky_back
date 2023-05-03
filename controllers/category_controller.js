const db = require("../db.js");
const ApiError = require("../error/ApiError.js");

class CategoryController {
   async create(req, res) {
    const {name,description } = req.body;
    const newCategory = await db.query(
      `INSERT INTO public.categories(
        name, description, createdat)
        VALUES ($1,$2, current_date) RETURNING *`,
        
      [name,description]
    );
    res.json(newCategory.rows[0]);
  }
  async getAll(req, res) {
    const categories = await db.query(`SELECT * FROM categories`);
    res.json(categories.rows);
  }
  async getOne(req, res) {
    const id = req.params.id;
    const category = await db.query(`SELECT * FROM categories where id =$1`, [id]);
    res.json(category.rows[0]);
  }
  async delete(req, res) {
      const id = req.params.id;
      const category = await db.query(`DELETE FROM categories where id =$1`, [id]);
      res.json(category.rows[0]);
}
}

module.exports = new CategoryController();
