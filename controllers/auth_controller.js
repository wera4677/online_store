const User = require("../models/user.model"); //사용자 데이터 불러오기
const authUtil = require("../util/authentication");
const validation = require("../util/validation");

function getSignup(req, res) {
  res.render("customer/auth/signup");
}

async function signup(req, res, next) {
  
   if(
    !validation.userDetailsAreValid(
        req.body.email,
        req.body.password, 
        req.body.fullname, 
        req.body.street, 
        req.body.postal, 
        req.body.city
        ) || !validation.emailIsConfirmed(req.body.email, req.body["confirm-email"])
    ) {
        res.redirect("/signup");
        return;
    }

    const user = new User(
        req.body.email,
        req.body.password,
        req.body.fullname,
        req.body.street,
        req.body.postal,
        req.body.city
      );


    try{ 
        const existsAlready = await user.existsAlready();

        if (existsAlready) {
            res.redirect("/signup");
            return;
        }

        await user.signup();

    } catch(error) {
        next(error);
        return;
    }
 

  res.redirect("/login");
}

function getLogin(req, res) {
    res.render("customer/auth/login");
}

async function login(req, res, next){ //유효성 검사 (데이터가 일치하는지 검사)
    const user = new User(req.body.email, req.body.password);
    let existingUser;

    try{
        const existingUser = await user.getYserWithSameEmail();
    }catch(error){
        next(error);
        return;
    }

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

function logout(req, res) {
    authUtil.destroyUserAuthSession(req);
    res.redirect("/login");
}

module.exports = {
  //외부 파일에서도 사용가능
  getSignup: getSignup,
  getLogin: getLogin,
  signup: signup,
  login: login,
  logout: logout,
};
