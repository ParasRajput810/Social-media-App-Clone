/* eslint-disable no-useless-catch */

const {Users} = require("../models/index");
const bcrypt = require("bcrypt");


class userRepo{
    async createUser(data){
        try {
            const user = await Users.create(data);
            
            return user;
        } catch (error) {
            throw error
        }
    }

    async getuser(id){
        try {
            const user = await Users.findByPk(id);
            return user;
        } catch (error) {
            throw error;
        }
    }

    async updateuser(id , data){
        try {
            const user = await Users.update(data , {
                where : {id : id}
            });
            return user;
        } catch (error) {
            throw error;
        }
    }

    async removeuser(id){
        try {
            const user = await Users.findByPk(id);
            await user.destroy();
            return true;
        } catch (error) {
            throw error;
        }
    }

    async login(data){
        try {
            const user = await Users.findOne(data , {
                where :{
                    email : data.useremail
                }
            });
            if(user){
                const userpass = user.userpassword;
                if(await bcrypt.compare(data.userpassword,userpass)){
                    return user;
                }
                else{
                    throw {error : "Incorrect password"}
                }
            }
            else{
                throw {error : "User not found"}
            }
    }
         catch (error) {
            throw error;
        }
    }
}



module.exports = userRepo;