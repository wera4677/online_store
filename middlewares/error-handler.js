//오류처리

function handleErrors(error, req, res, next) {//라우트 핸들러 함수 중 하나에 오류가 있을때 마다 호출
    console.log(error);
    res.status(500).render('shared/500');//서버의 문제가 발생할때 활성화
}
  
  module.exports = handleErrors;