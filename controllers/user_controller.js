const db = require("../db.js");
const ApiError = require("../error/ApiError.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const generateJwt = (id, login, role) => {
  return jwt.sign({ id, login, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserController {
  async registration(req, res, next) {
    const { login, password, role } = req.body;
    if (!login || !password) {
      return next(ApiError.badRequest("Некорректный логин или пароль"));
    }
    const candidate = await db.query(
      `select * from public.users where login=$1`,
      [login]
    );
    if (candidate.rowCount) {
      return next(
        ApiError.badRequest("Пользователь с таким логином уже существует")
      );
    }
    const hashPassword = await bcrypt.hash(password, 5);
    const newUser = await db.query(
      `INSERT INTO public.users(
            role, createdAt, password, login)
            VALUES ($1, current_date, $2,$3) RETURNING *`,
      [role, hashPassword, login]
    );
    const token = generateJwt(newUser.rows[0].id, newUser.rows[0].login, newUser.rows[0].role);

    return res.json({ token });
  }
  
  async login(req, res, next) {
    const { login, password } = req.body;
    const user = await db.query(`select * from public.users where login=$1`, [
      login,
    ]);
    if (!user.rowCount) {
      return next(
        ApiError.internal("Пользователь с таким логином не существует")
      );
    }
    let comparePassword = bcrypt.compareSync(password, user.rows[0].password);
    if (!comparePassword) {
      return next(ApiError.internal("указан неверный пароль"));
    }
    const token = generateJwt(user.rows[0].id, user.rows[0].login, user.rows[0].role);
    return res.json({ token });
  }

  async check(req, res, next) {
        const token= generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
  }
}

module.exports = new UserController();
