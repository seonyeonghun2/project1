import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await userModel.getOneUser(id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const addUser = async (req, res) => {
  const { id, pwd, name, email, phone } = req.body;
  try {
    const user = await userModel.addUser({ id, pwd, name, email, phone });
    if (user) {
      res.status(200).json({
        status: true,
        message: "사용자 등록 성공!",
      });
    } else {
      res.status(500).json({
        status: false,
        message: "유저를 추가하지 못했습니다.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req, res) => {
  const { id, pwd } = req.body;
  try {
    const user = await userModel.loginUser(id);
    // console.log(user[0].pwd);
    let isMatch = await bcrypt.compare(pwd, user[0].pwd);
    if (isMatch) {
      res.status(200).json({
        status: true,
        message: "로그인 성공!",
      });
    } else {
      res.status(500).json({
        status: false,
        message: "로그인에 실패했습니다.",
      });
    }
  } catch (err) {
    console.log(err);
  }
};
const userController = {
  getAllUsers,
  getOneUser,
  addUser,
  loginUser,
};

export default userController;
