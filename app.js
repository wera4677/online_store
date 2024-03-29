const path = require("path");
const express = require("express"); 

const authRoutes = require("./routes/auth_routes");

const app = express(); 

app.set("view engine","ejs") //ejs를 사용하기위한 옵션 설정
app.set("views", path.join(__dirname, "views") )//views의 위치를 알려주는 옵션

app.use(express.static("public"));//정적 파일 명시 


app.use(authRoutes); //모든 라우터의 요청이 잘되는지 평가(get,post)



app.listen(3000);