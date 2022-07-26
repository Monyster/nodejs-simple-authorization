const express = require("express")
const mongoose = require("mongoose")

const authRouter = require("./Routers/authRouter")

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use('/auth', authRouter)


const start = async () => {
    try {
        await mongoose.connect("mongodb+srv://root:QwertY@cluster0.bvnzdf8.mongodb.net/?retryWrites=true&w=majority")
        app.listen(PORT, () => console.log(`Started on port - ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

start();