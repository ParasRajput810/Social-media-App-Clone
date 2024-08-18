const userservice = require("../service/userservice");

const userService = new userservice();

const createuser = async(req,res)=> {
    try {
        const user = await userService.createuser(req.body);
        return res.status(201).json({
            data: user,
            message: "User created successfully",
            err: {}
        })
    } catch (error) {
        return res.status(404).json({
            data: [],
            message: "Error creating user",
            err: error
        })
    }
}

const updateuser = async(req,res)=>{
    try {
        // eslint-disable-next-line no-unused-vars
        const user = await userService.updateuser(req.params.id,req.body);
        return res.status(201).json({
            message: "User updated successfully",
            err: {}
        })
    } catch (error) {
        return res.status(404).json({
            data: [],
            message: "Error updating user",
            err: error
        });
    }
}

const removeuser = async(req,res)=>{
    try {
        const user = await userService.removeuser(req.params.id);
        return res.status(201).json({
            data: user,
            message: "User deleted successfully",
            err: {}
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error! user not found",
            err: error
        });
    }
}

const getuser = async(req,res)=>{
    try {
        const user = await userService.getuser(req.params.id);
        return res.status(201).json({
            data: user,
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error! user not found",
            err: error
        });
    }
}

const userlogin = async(req,res)=>{
    try {
        const user = await userService.userlogin(req.body);
        return res.status(201).json({
            data: user,
            message: "User logged in successfully",
        })
    } catch (error) {
        return res.status(404).json({
            message: "Error! user not found",
            err: error
        });
    }
}

module.exports = {
    createuser,
    updateuser,
    getuser,
    removeuser,
    userlogin
}