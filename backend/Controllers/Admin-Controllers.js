const HttpError = require("../Middleware/http-error");
const { validationResult } = require("express-validator");
const Admin = require("../Models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async(req, res, next)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty()){
        return res.status(422).json({
            message:"Invalid inputs passed, please try again",
            errors:errors.array()
        })
    }
    const {employeeId,firstName,lastName,email,password}=req.body
    let existingAdmin
    try{
        existingAdmin=await Admin.findOne({email:email})
    }catch(err){
        const error=new HttpError("Something went wrong, please try again",500)
        return next(error)
    }
    if(existingAdmin){
        const error=new HttpError("Email already exists, please try logging in",500)
    }
    let hashedPassword;
    try{
        hashedPassword=await bcrypt.hash(password,12)
    }catch(err){
        const error=new HttpError("Something went wrong, please try again",500)
        return next(error)
    }
    const createdAdmin=new Admin({
        employeeId,
        firstName,
        lastName,
        email,
        password:hashedPassword,
        image:req.file.path
    })
    try{
        await createdAdmin.save()
    }catch(err){
        const error=new HttpError("Something went wrong creating the admin, please try again",500)
        return next(error)
    }
    let token
    try{
        token=jwt.sign(
            {userId:created}
        )
    }
}
