function getSignup(req, res) {
    res.render("customer/auth/signup");
}

function getLogin(req, res) {

}

module.exports = { //외부 파일에서도 사용가능 
    getSignup: getSignup,
    getLogin: getLogin
};