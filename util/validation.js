//유효성 검사 관련 논리

function isEmpty(value) {
  return !value || value.trim() === "";
}

function userCredentialsAreValid(email, password) {
  email && email.includes("@") && password && password.trim().length >= 6;
}

function userDetailsAreValid(email, password, name, street, postal, city) {
  //이메일에 @ 기호가 포함되는지 확인, 공백제거 및 6글자 이상, 이름이 빈 문자열이 아닌지 확인
  return (
    userCredentialsAreValid(email, password) &&
    !isEmpty(name) &&
    !isEmpty(street) &&
    !isEmpty(postal) &&
    !isEmpty(city)
  );
}

function emailIsConfirmed(email, confirmEmail) {
  return email === confirmEmail;
}

module.exports = {
  userDetailsAreValid: userDetailsAreValid,
  emailIsConfirmed: emailIsConfirmed,
};
