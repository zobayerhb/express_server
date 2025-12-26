// import { Router } from "express";
import express, { Request, Response } from "express";
import { userController } from "./user.controller";

const router = express();

// router --> controller (only work on --> request and response ) --> services (business logic ---> database logic)

// app.use("/user/", userRoutes)
router.post("/", userController.userCreate);

// get users
router.get("/", userController.getUsers);

// get single user
router.get("/:id", userController.getSingleUser);

// update user
router.put("/:id", userController.updateSingelUser);

// delete user
router.delete("/:id", userController.deleteUser);

export const userRoutes = router;
