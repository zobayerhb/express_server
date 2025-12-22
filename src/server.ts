import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import logger from "./middleware/logger";
import { userRoutes } from "./modules/user/user.routes";

const app = express();
const port = config.port;
// parser
app.use(express.json());
// app.use(express.urlencoded())

// Note: initialized db
initDB();

app.get("/", logger, (req: Request, res: Response) => {
  res.send("Hello next level developers");
});

// NOTE: user crud
// use app.use
app.use("/users", userRoutes);

// Note: get all users
// app.get("/users", async (req: Request, res: Response) => {
//   try {
//     const result = await pool.query(`SELECT * FROM users`);

//     res.status(200).json({
//       success: true,
//       message: "User retrive successfully",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(500).json({
//       success: false,
//       message: err.message,
//       details: err,
//     });
//   }
// });

// Note: get single user
app.get("/users/:id", async (req: Request, res: Response) => {
  const body = req.params.id;

  const result = await pool.query(`SELECT * FROM users WHERE id = $1`, [body]);

  if (result.rows.length === 0) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: result.rows[0],
    });
  }
});

// Note: update user
app.put("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2 WHERE id=$3 RETURNING *`,
    [name, email, id]
  );

  if (result.rows.length === 0) {
    res.status(404).json({
      success: false,
      message: "User not found",
    });
  } else {
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
    });
  }
});

// Note: delete user
app.delete("/users/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await pool.query(`DELETE FROM users WHERE id = $1`, [id]);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
        data: result.rows,
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

//  TODO:  USER TODO CREATE
app.post("/todos", async (req: Request, res: Response) => {
  const { user_id, title } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO todos(user_id, title) VALUES($1, $2) RETURNING *`,
      [user_id, title]
    );

    res.status(201).json({
      success: true,
      message: "Todos created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

// Note: get all todos
app.get("/todos", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM todos`);

    res.status(200).json({
      success: true,
      message: "Todos retrive successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      succcess: false,
      data: err.message,
    });
  }
});

// 404 not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.path,
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
