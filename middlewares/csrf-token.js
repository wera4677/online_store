//보안 관련

function addCsrfToken(req, res, next){
    res.locals.csrftoken =req.csrftoken(); //유효한 토큰 생성
    next(); //미들웨어로 요청을 전달
}

module.exports = addCsrfToken;