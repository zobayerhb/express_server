import { Request, Response } from "express";
import { userServices } from "./user.service";

const userCreate = async (req: Request, res: Response) => {
  const { name, email } = req.body;

  try {
    const result = await userServices.createUser(name, email);

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const userController = {
  userCreate,
};
