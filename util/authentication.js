//로그인 관련

function createUserSession(req, user, action) {
    req.session.uid = user._id.toString();
    req.session.isAdmin = user.isAdmin;
    req.session.save(action);
}

function destroyUserAuthSession(req) { //로그인 토큰 삭제
    req.session.uid = null;
    req.session.save();
}

module.exports ={
    createUserSession: createUserSession,
    destroyUserAuthSession: destroyUserAuthSession,
}