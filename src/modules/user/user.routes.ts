// import { Router } from "express";
import express, { Request, Response } from "express";
import { pool } from "../../config/db";
import { userController } from "./user.controller";

const router = express();

// router --> controller --> services(business logic ---> database logic)

// app.use("/user/", userRoutes)
router.post("/", userController.userCreate);

// get users
router.get("/", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`SELECT * FROM users`);

    res.status(200).json({
      success: true,
      message: "User retrive successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
      details: err,
    });
  }
});

export const userRoutes = router;
