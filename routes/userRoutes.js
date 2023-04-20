import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  updateUser,
} from "../controllers/userController.js";
const router = express.Router();

//CRUD operation
//CREATE post
//READ get
//UPDATE patch/put
//DELETE delete

//  "/users"
router.get("/", getAllUsers);
//creating user
//register user
router.post("/", createUser);
//    /users/login
router.post("/login", loginUser);
//update
// /users/safdajdfkjgdfdsf
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
