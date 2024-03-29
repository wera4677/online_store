const express = require("express");

const authcontroller = require("../controllers/auth_controller"); //파일에 있는 함수 사용가능

const router = express.Router(); //라우터 객체를 생성

router.get("/signup", authcontroller.getSignup);//가입페이지를 얻기위한 라우트

router.get("/login", authcontroller.getLogin);//로그인 페이지를 얻기위한 라우트

module.exports = router; //모든 라우터가 노출됬었음을 알림


