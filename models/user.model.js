//키 와 역할 
//bcryptjs패키지 => 암호화 또는 해싱 암호를 사용하는것에 도움
const bcrypt = require('bcryptjs'); //암호화에 도움

const db = require('../data/database'); //데이터베이스에 연결



class User {
    constructor(email, passwoed, fullname, street, postal, city){ //생성자 메서드 
        this.email = email;
        this.passwoed = passwoed;
        this.name = fullname;
        this.address = {
            street: street,
            postalCode: postal,
            city: city,
        };
    }
    
    getUserWithSameEmail(){
        return db.getDb().collection("users").findOne({ eamil: this.email });//DB에서 간단한 동등비교 수행
    }

    async existsAlready(){ //DB에 이메일이 없으면 참 
        const existingUser = await this.getUserWithSameEmail();
        if (existingUser) {
            return true;
        }
        return false;
    }

    async signup(){ //사용자 데이터를 데이터베이스에 저장
        const hashedPassword = await bcrypt.hash(this.passwoed, 12); //암호화된 비밀번호로 저장

        await db.getDb().collection('users').insertOne({
            email: this.email,
            passwoed: hashedPassword, //보안문제 해결을 위해 해싱(암호) 사용
            name: this.name,
            address: this.address,
        });//DB 컬랙션 에 데이터 저장 
    }

    hasMatchingPassword(hashedPassword){
        return bcrypt.compare(this.passwoed, hashedPassword); //해싱된 암호 비교
    }
}

module.exports = User;