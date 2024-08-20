import express, { urlencoded } from "express";
import userRouter from "./routes/userRoutes.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
// route : .get(): 받기, .post(): 보내기, .put(): 보내서 부분 수정, .delete() : 보내서 삭제
// RESTful API : REpresentational (대표성 있는 방식으로 요청 URL을 생성하는 규칙)

app.use("/", userRouter);

app.use((req, res, next) => {
  if ((process.env.NODE_ENV = "production")) {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});
const setting = {
  app,
  port,
};

export default setting;
