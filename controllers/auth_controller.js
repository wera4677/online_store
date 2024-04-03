const User = require("../models/user.model"); //사용자 데이터 불러오기

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res) {
  //유효성 검사
  const user = new User(
    req.body.email,
    req.body.password,
    req.body.fullname,
    req.body.street,
    req.body.postal,
    req.body.city
  );

  await user.signup();

  res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

module.exports = {
  //외부 파일에서도 사용가능
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
