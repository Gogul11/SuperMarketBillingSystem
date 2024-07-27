const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
    {
        p_id : {
            type : Number,
            required : true
        },
        name :{
            type:String,
            required:true
        },
        price :  {
            type : Number,
            required : true
        },
        discount : {
            type : Number,
            required : true
        }
    },
    {
        timestamps:true
    }
)

const ProductModel = new mongoose.model("products", ProductSchema)

const BillSchema = new mongoose.Schema(
    {
        mobile : {
            type : Number,
            required : true
        },
        amt: {
            type : Number,
            required : true
        },
        bill : {
            type: Array,
            required : true
        },
        method : {
            type : String,
            required : true
        }
    },
    {
        timestamps: true
    }
)

const BillModel = new mongoose.model("Bill", BillSchema)

const Userschema = new mongoose.Schema(
    {
        username  : {
            type: String,
            required: true
        },
        password : {
            type : String,
            required :true
        }
    },
    {
        timestamps: true
    }
)

const UserModel = new mongoose.model("User", Userschema)



module.exports = {ProductModel, BillModel, UserModel}