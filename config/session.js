//모든 세션 설정 작업을 수행
const expressSession = require("express-session");
const mongoDbStore =require("connect-mongodb-session"); //DB의 세션을 관리하기위한 패키지

function createSessionStore() {
    const MongoDBStore = mongoDbStore(expressSession); //몽고 세션을 사용하게해줌

    const store = new MongoDBStore({ //새로운 저장소 객체 생성
        uri: "mongodb://localhost:27017",
        databaseName: "online-shop",
        collection: "sessions",
    });

    return store;
}

function createSessionConfig() {//세션에 대한 구성을 생성
    return {
        secret: "super-secrett",
        resave: false,
        saveUninitialized: false,
        store: createSessionStore(),
        cookie: {//사용자가 브라우저를 닫을때마다 지워지거나 세션이 무효화
            maxAge: 2 * 24 * 60 * 60 * 1000
        }
    };
}

module.exports = createSessionConfig;