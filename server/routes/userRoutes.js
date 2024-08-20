import express from "express";
import userController from "../controller/userController.js";
const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log("Time: ", Date.now());
  next();
});

router.get("/users", userController.getAllUsers);
router.get("/user/:id", userController.getOneUser);
router.post("/user", userController.addUser);
router.post("/login", userController.loginUser);

export default router;
