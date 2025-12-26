import { Request, Response } from "express";
import { userServices } from "./user.service";
import { pool } from "../../config/db";

// create user
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

// get users
const getUsers = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUsers();

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
};

// get single user
const getSingleUser = async (req: Request, res: Response) => {
  const body = req.params.id;

  const result = await userServices.getSingleUser(body as string);

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
};

// update single user
const updateSingelUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  const { name, email } = req.body;

  const result = await userServices.updateSingleUser(name, email, id as string);

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
};

// delete user
const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const result = await userServices.deleteUser(id as string);

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
};

export const userController = {
  userCreate,
  getUsers,
  getSingleUser,
  updateSingelUser,
  deleteUser
};
