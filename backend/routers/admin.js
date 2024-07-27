const express = require("express")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")
const jwt = require("jsonwebtoken")
require('dotenv').config()

const {ProductModel, UserModel, BillModel} = require("../model.js")

const admin = express.Router()

const url = bodyParser.urlencoded({extended : false})

//Authentication for session token
const authMiddleware = async(req, res, next) => {
        const token = await req.header('Authorization')?.split(' ')[1];
        if (!token) return res.status(401).json({ success: false, message: 'No token, authorization denied' });

        try {
                const decoded = jwt.verify(token, process.env.SECRET_KEY);
                req.user = decoded;
                next();
        } catch (err) {
        res.status(400).json({ success: false, message: 'Token is not valid' });
        }
};

admin.get("/", authMiddleware, async(req, res) => {
        const flag = await req.user
        const amts = await BillModel.find({}, {_id : false, amt : true, method: true})
        const totamt = amts.reduce((def, amt) => def + amt.amt, 0)
        const totProduct = await ProductModel.countDocuments({})
        const list = [totamt, totProduct]
        try {
                if(flag) return res.status(200).json({success : true, value:list})
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }

})

admin.post("/login", async (req, res) => {
        const userinfo = await UserModel.findOne({username : req.body.username})
        if(userinfo == null){
                return res.status(200).json({success:false, message : "could not find user"})
        }
        const oneuser = await bcrypt.compare(req.body.password, userinfo.password)
        if(!oneuser){
                return res.status(500).json({success : false, message : "Password is worng"})
        }
        try{
                const token = jwt.sign({id:userinfo._id}, process.env.SECRET_KEY)
                if(!token) res.status(404).json({success:false})
                return res.status(201).json({success:true, authenticate:token})
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }
})

admin.get("/register",authMiddleware, (req, res) => {
        
        if(!req.user) return res.status(500).json({success:false, message:"Something went wrong"})
        res.status(200).json({success : true})
})

admin.post("/register",authMiddleware, async(req, res) => {

        if(!req.user) return res.status(500).json({success:false, message:"Something went wrong"})
        const salt = await bcrypt.genSalt(10)
        const newPassword = await bcrypt.hash(req.body.password, salt)

        try {
                const Udata = await new UserModel({username:req.body.username, password:newPassword})
                Udata.save()
                if(Udata){
                        return res.status(201).json({success:true})
                }
                else{
                        return res.status(404).json({success : false})
                }
        } catch (error) {
                return res.status.json({success:false, message: error.message})
        }
})


admin.post("/add", url,authMiddleware,async (req, res) => {
        if(!req.user) return res.status(500).json({success:false, message:"Something went wrong"})
        try {
                const newProduct = await ProductModel(req.body)
                newProduct.save()
                return res.status(201).json({success : true})
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }
})

admin.put("/update/:Id",authMiddleware, async (req, res) => {

        const updates = req.body
        if(!req.user) return res.status(500).json({success:false, message:"Something went wrong"})
        try {
                const updatedProduct = await ProductModel.findOneAndUpdate({p_id : parseInt(req.params.Id)},  { $set: updates }, {new: true})

                if(updatedProduct){
                        return res.status(201).json({success: true})
                }
                else{
                        return res.status(404).json({success : false})
                }
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }        
})

admin.delete("/delete/:id",authMiddleware, async (req, res) => {
        if(!req.user) return res.status(500).json({success:false, message:"Something went wrong"})
        try {
                const deleteProduct = await ProductModel.findOneAndDelete({p_id : req.params.id})
                if(deleteProduct){
                        return res.status(200).json({success : true})
                }
                else{
                        return res.status(404).json({success : false})
                }
        } catch (error) {
                return res.json({success : false, message : error.message})
        }

})

module.exports = admin