import mariadb from "mariadb";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
const saltRounds = 10;

// db connection
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  dateStrings: true,
});

const getAllUsers = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("SELECT * FROM users");
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
const getOneUser = async (idx) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("SELECT * FROM users WHERE ROWNUM() = ?", [
      idx,
    ]);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

const addUser = async ({ id, pwd, name, email, phone }) => {
  let conn;
  const hashedPwd = await bcrypt.hash(pwd, saltRounds);
  try {
    conn = await pool.getConnection();
    let rows = await conn.query(
      "INSERT INTO users (id, pwd, name, email, phone) VALUES (?, ?, ?, ?, ?)",
      [id, hashedPwd, name, email, phone]
    );
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};

const loginUser = async (id) => {
  let conn;
  try {
    conn = await pool.getConnection();
    let rows = await conn.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows;
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) conn.release();
  }
};
const userModel = {
  getAllUsers,
  getOneUser,
  addUser,
  loginUser,
};

export default userModel;
