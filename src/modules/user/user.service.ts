import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

// create user
const createUser = async (payload: Record<string, unknown>) => {
  const { name, email, password } = payload;
  const hasedPassword = await bcrypt.hash(password as string, 10);

  const result = await pool.query(
    `INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *`,
    [name, email, hasedPassword],
  );

  return result;
};

// get users
const getUsers = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

// get sinlge user
const getSingleUser = async (body: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [body]);
  return result;
};

// update single user
const updateSingleUser = async (name: string, email: string, id: string) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id],
  );
  return result;
};

// delete user
const deleteUser = async (id: string) => {
  const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);
  return result;
};

export const userServices = {
  createUser,
  getUsers,
  getSingleUser,
  updateSingleUser,
  deleteUser,
};
