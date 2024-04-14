// 보안 관련

function addCsrfToken(req, res, next) {
    res.locals.csrfToken = req.csrfToken(); // 올바른 토큰 생성
    next(); // 미들웨어로 요청을 전달
}

module.exports = addCsrfToken;
