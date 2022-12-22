const express = require('express')
const dotenv = require('dotenv')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
const mongoose = require('mongoose')
const { response } = require('express')
const fs = require('fs')
mongoose.Promise = global.Promise
dotenv.config({ path: './config.env' })
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
app.use(express.static(__dirname + "/public/"))
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con =>  {
    console.log(con.connections)
    console.log('DB connection successful')
    
})

const nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String
})

const User = mongoose.model('User', nameSchema)

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get('/addname', (req, res) => {  
    const response = {  
           firstName:req.query.firstName,  
           lastName:req.query.lastName  
       }
    User.find({ firstName: response.firstName, lastName: response.lastName}, "firstName lastName", (err, usernames) => {
        if(err) throw err
        res.end("hi " + usernames[0].firstName + " " + usernames[0].lastName)
    })  
})    

app.post('/addname', (req, res) => {
    const myData = new User(req.body)
    myData.save()
        .then(item => {
            res.send("item saved to database")
        })
        .catch(err => {
            res.status(400).send("unable to save to db")
        })
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`)
})