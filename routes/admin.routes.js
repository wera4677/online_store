//모든 관리 관련 경로를 함께 그룹화
//제품 라우트,제품관리 라우트, 주문관리 라우트
const express = require('express');

const adminController = require('../controllers/admin.controller');

const router = express.Router();

router.get('/products', adminController.getProducts ); //admin/products

router.get('/products/new', adminController.getNewProducts );

module.exports = router;
