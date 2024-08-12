import express, { urlencoded } from "express";
import mariadb from "mariadb";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: false }));
// route : .get(): 받기, .post(): 보내기, .put(): 보내서 부분 수정, .delete() : 보내서 삭제
// RESTful API : REpresentational (대표성 있는 방식으로 요청 URL을 생성하는 규칙)
app.get("/", function (req, res) {
  res.send("<h1>Hello World</h1>");
});

// db connection
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PWD,
  database: process.env.DB_NAME,
  connectionLimit: 5,
  trace: true,
});

app.get("/getAllUsers", function (req, res) {
  pool
    .getConnection()
    .then((conn) => {
      console.log(`MariaDB connected: ${conn.threadId}`.bgYellow.white);
      conn
        .query("SELECT * FROM users")
        .then((rows) => {
          //console.log(rows); //[ {val: 1}, meta: ... ]
          res.status(200).json(rows);
          return rows;
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      //not connected
    });
  // res.send("=========== db connection succeed ==========");
});
app.get("/getAllUsers/:id", function (req, res) { // URL파라미터 (동적 라우팅)
  const id = parseInt(req.params.id);
  console.log(id, typeof id);
  pool
    .getConnection()
    .then((conn) => {
      console.log(`MariaDB connected: ${conn.threadId}`.bgYellow.white);
      conn
        .query("SELECT * FROM users WHERE id = ?", [id])
        .then((rows) => {
          if (rows.length === 0) {
            res.status(404).json({
              status: "error",
              message: "User not found",
            });
          } else {
            res.status(200).json(rows);
            return conn.end();
          }
        })
        .then((res) => {
          console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }
          conn.end();
        })
        .catch((err) => {
          //handle error
          console.log(err);
          conn.end();
        });
    })
    .catch((err) => {
      //not connected
      res.status(500).json({
        status: "error",
        message: "user not found",
      });
    });
  // res.send("=========== db connection succeed ==========");
});

app.listen(3000);
