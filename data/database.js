//DB를 연결하기위하여 작성
const mongodb = require("mongodb"); //몽고 패키지 사용

const MongoClient =mongodb.MongoClient;

let database;

async function connectToDatabase(){
    const client = await MongoClient.connect("mongodb://localhost:27017");//URL로 연결
    database = client.db("online-shop"); //입력될때 자동 생성
}

function getDb(){
    if(!database){ //오류처리
        throw new Error('You must connect first!'); //DB를 연결 설정 하지않고 연결할려고하면 오류 발생
    }

    return database;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    getDb: getDb,
}

