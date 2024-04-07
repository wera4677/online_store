const express = require("express");

const router = express.Router(); //라우터 객체를 생성

router.get("/products", function(req, res){
    res.render("customer/products/all-products");
});

module.exports = router; //모든 라우터가 노출됬었음을 알림


