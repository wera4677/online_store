function checkAuthStatus(req, res, next) {
    const uid = req.session.uid;

    if(!uid){ //요청이 들어온 사용자가 없을경우
        return next(); //계속진행
    }

    res.locals.uid = uid;
    res.locals.isAuth  = true; //인증됨을 알림
    next();
}

module.exports = checkAuthStatus;