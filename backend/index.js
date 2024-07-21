const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")

const {PORT, mongourl} = require("./config.js")
const {ProductModel} = require("./model.js")

const bill = require("./routers/bill.js")
const admin = require("./routers/admin.js")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/bill", bill)
app.use("/admin", admin)

app.get("/", (req, res) => {
    res.status(200).json({success : true})
})


mongoose.connect(mongourl)
.then(() => {
    app.listen(PORT, () => console.log("successfull"))
})
.catch((err) => {
    console.log(err.message)
})