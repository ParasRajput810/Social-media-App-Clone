/* eslint-disable no-useless-catch */
const userrepo = require("../repository/userrepo");
const {JWT_SECRET_KEY} = require("../config/serverconfig");
const jwt = require("jsonwebtoken");
const secretKey = JWT_SECRET_KEY;// 

class UserService{
    constructor(){
        this.userservice = new userrepo();
    }

    async createuser(data){
        try {
            const user = await this.userservice.createUser(data);
            return user;
        } catch (error) {
            throw error
        }
    }

    async updateuser(id, data){
        try {
            const user = await this.userservice.updateuser(id , data);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async removeuser(id){
        try {
            const user = await this.userservice.removeuser(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async getuser(id){
        try {
            const user = await this.userservice.getuser(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async userlogin(data){
        try {
            const user = await this.userservice.login(data);
            if(user){
                const token = await jwt.sign({ email: user.useremail, usertype: user.usertype }, secretKey, { expiresIn: '1h' });
                let finaluser = {};
                finaluser = {...finaluser , 'userID': user.id ,'email': user.useremail ,'token': token, 'username':user.username };
                return finaluser;
            }
            else{
                console.log("hello i am not here");
            }
            return user
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;