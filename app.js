const path = require("path");

const express = require("express");
const csrf = require("csurf"); //보안 관련한 패키지
const expressSession = require("express-session");

const createSessionConfig = require("./config/session"); //세션 관련 데이터
const db = require("./data/database");
const addCsrfTokenMiddleware = require("./middlewares/csrf-token");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authRoutes = require("./routes/auth_routes");
const productRoutes = require("./routes/products.routes");
const baseRoutes = require("./routes/base.routes");


const app = express();

app.set("view engine", "ejs"); //ejs를 사용하기위한 옵션 설정
app.set("views", path.join(__dirname, "views")); //views의 위치를 알려주는 옵션

app.use(express.static("public")); //정적 파일 명시

app.use(express.urlencoded({extended: false}));

const sessionConfig = createSessionConfig();

app.use(expressSession(sessionConfig));
app.use(csrf()); //유효한 CSRF 토큰이 없는 모든요청은 거부된다.
app.use(addCsrfTokenMiddleware);

app.use(baseRoutes);
app.use(authRoutes); //모든 라우터의 요청이 잘되는지 평가(get,post)
app.use(productRoutes);

app.use(errorHandlerMiddleware); //오류처리 미들웨어

db.connectToDatabase()
  .then(function () { //성공했을때 수신대기 시작
    app.listen(3000);
  })
  .catch(function (error) { //실패했을때 에러 표시
    console.log("Failed to connect to the database!");
    console.log(error);
  });
