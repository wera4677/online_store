const path = require("path");
const express = require("express");

const db = require("./data/database");

const authRoutes = require("./routes/auth_routes");

const app = express();

app.set("view engine", "ejs"); //ejs를 사용하기위한 옵션 설정
app.set("views", path.join(__dirname, "views")); //views의 위치를 알려주는 옵션

app.use(express.static("public")); //정적 파일 명시

app.use(authRoutes); //모든 라우터의 요청이 잘되는지 평가(get,post)

db.connectToDatabase()
  .then(function () { //성공했을때 수신대기 시작
    app.listen(3000);
  })
  .catch(function (error) { //실패했을때 에러 표시
    console.log("Failed to connect to the database!");
    console.log(error);
  });
