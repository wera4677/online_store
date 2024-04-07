const express = require("express");

const router = express.Router(); //라우터 객체를 생성

router.get("/", function(req, res){
    res.redirect("/products");
});

module.exports = router; //모든 라우터가 노출됬었음을 알림


