const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const userServices = require('./services/user')
const postServices =require('./services/post')
const friendServices = require('./services/friend')
const commentServices = require('./services/comment')
var fileupload = require("express-fileupload");
const cors = require('cors')
const db = require('./models')
const passport = require('passport')
app.use(fileupload());
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(express.static('upload'))

require('./config/passport/passport')


db.sequelize.sync({alter:false}).then(()=>{

    userServices(app,db)
    postServices(app,db)
    friendServices(app,db)
    commentServices(app,db)

    app.listen(8080,()=>{
        console.log('server is runing or port 8080')
    })

})