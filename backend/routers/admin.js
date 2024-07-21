const express = require("express")
const bcrypt = require("bcrypt")
const bodyParser = require("body-parser")

const {ProductModel, UserModel} = require("../model.js")

const admin = express.Router()

const url = bodyParser.urlencoded({extended : false})

admin.get("/", async(req, res) => {
        res.status(200).json({success : true})
})

admin.get("/login", async (req, res) => {
        const userinfo = await UserModel.find({}, {username:true,password:true, _id:false})
        console.log(userinfo)
        const user = userinfo.find(user => user.username === req.body.username)
        if(user == null){
                return res.status(200).json({success:false, message : "could not find user"})
        }
        try{
                const oneuser = await bcrypt.compare(req.body.password, user.password)
                if(oneuser){
                        return res.status(201).json({success:true, data: oneuser})
                }
                else{
                        return res.status(404).json({success:false})
                }
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }
})

admin.get("/register", (req, res) => {
        res.status(200).json({success : true})
})

admin.post("/register", async(req, res) => {

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


admin.post("/add", url,async (req, res) => {
        try {
                const newProduct = await ProductModel(req.body)
                newProduct.save()
                return res.status(201).json({success : true})
        } catch (error) {
                return res.status(404).json({success : false, message : error.message})
        }
})

admin.put("/update/:Id", async (req, res) => {

        const updates = req.body

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

admin.delete("/delete/:id", async (req, res) => {
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