const User = require("../models/user.model"); //사용자 데이터 불러오기
const authUtil = require("../util/authentication");

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

async function login(req, res){ //유효성 검사 (데이터가 일치하는지 검사)
    const user = new User(req.body.email, req.body.password);
    const existingUser = await user.getYserWithSameEmail();

    if(!existingUser){ //주어진 데이터를 찾지못했을경우
        res.redirect("/login");
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if(!passwordIsCorrect){
        res.redirect("/login");
        return;
    }

    authUtil.createUserSession(req, existingUser, function(){
        res.redirect("/");
    });
}

module.exports = {
  //외부 파일에서도 사용가능
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
};
