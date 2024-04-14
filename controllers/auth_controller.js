const User = require("../models/user.model"); //사용자 데이터 불러오기
const authUtil = require("../util/authentication");
const validation = require("../util/validation");
const sessionFlash = require("../util/session-flash");

function getSignup(req, res) {
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData){
        sessionData = {
            email: "",
            confirmEmail: "",
            password: "",
            fullname: "",
            street: "",
            postal: "",
            city: "",
        };
    }

    res.render("customer/auth/signup", { inputData: sessionData });
}

async function signup(req, res, next) {
    const enteredData = {
       email: req.body.email,
       confirmEmail: req.body["confirm-email"],
       password: req.body.password, 
       fullname: req.body.fullname, 
       street: req.body.street, 
       postal: req.body.postal, 
       city: req.body.city
    };    

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
        sessionFlash.flashDataToSession(req, {
            errorMessage: "Please check your input. Password must be at least 6 characters. long postal code must be 5 characters long.",
            ...enteredData,
        },
        function(){
            res.redirect("/signup");
        })
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
            sessionFlash.flashDataToSession(req, {
                errorMessage:"User exists already! Try logging in instrad!",
                ...enteredData,
            }, 
            function(){
                res.redirect("/signup");
            })
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
    let sessionData = sessionFlash.getSessionData(req);

    if(!sessionData) {
        sessionData = {
            email: "",
            password: ""
        };
    }
    res.render("customer/auth/login", { inputData: sessionData });
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

    const sessionErrorData = {
        errorMessage:"Invalid credentials - Please double check your email and passord!",
        email: user.email,
        password: user.passwoed,
    };

    if(!existingUser){ //주어진 데이터를 찾지못했을경우
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect("/login");
        })
        return;
    }

    const passwordIsCorrect = await user.hasMatchingPassword(existingUser.password);

    if(!passwordIsCorrect){
        sessionFlash.flashDataToSession(req, sessionErrorData, function(){
            res.redirect("/login");
        })
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
