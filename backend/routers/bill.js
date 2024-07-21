const express = require("express")

const {ProductModel, BillModel} = require("../model.js")

const bill = express.Router()

// /bill
bill.get("/", async (req, res) => {

    try {
        const data = await ProductModel.find({}, 
                                            {_id:false,
                                            p_id : true, 
                                            price:true,
                                            discount:true,
                                            name: true})
        if(data){
            return res.status(200).json({success:true, products : data})
        }
        else{
            return res.status(404).json({success:false})
        }
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }

})

// /bill/payment
bill.get("/payment", (req, res) => {
    res.status(200).json({success : true})
})

bill.post("/:num/:amt", async (req, res) => {
    const num = parseInt(req.params.num)
    const amt = parseInt(req.params.amt)
    try {
        const bill = await BillModel({
                                    mobile : num,
                                    amt : amt,
                                    bill : req.body.bill})
        
        bill.save()

        if(bill){
            return res.status(200).json({success : true})
        }
        else{
            return res.status(404).json({success : false})
        }
    } catch (error) {
        return res.status(404).json({success : false, message : error.message})
    }
})

module.exports = bill