const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtOptins = require('../config/passport/passport')
module.exports = (app,db)=>{
    app.post('/registerUser',(req,res,next)=>{
        passport.authenticate('register',(err,user,info)=>{
            if(err){
                console.error(err);
                
            }
            if(info !== undefined ){
               
                console.error(info.message)
                res.status(403).send(info.message)
            }else{
                user.update({
                    name:req.body.name,
                    role:'user'
                }).then(()=>{
                    console.log('user created in db')
                    res.status(200).send({message:'user created'})
                }).catch((err)=>{
                    console.error(err);
                    res.status(400).send({message:err.message})
                    
                })

             }

        })(req,res,next)
    })


    app.post('/loginUser',(req,res,next)=>{
        passport.authenticate('login',(err,user,info)=>{
            if (err){
               console.error(err);
               
            }
            if(info !== undefined){
                console.log(info.message);
                if(info.message ==="username or password incorrect"){
                    res.status(401).send({message:info.message})
                }else{
                    res.status(400).send({message:info.message})
                }
            }
            else{
                const token = jwt.sign({id:user.id,role:user.roel,name:user.name},
                    jwtOptins.secretOrkey,{
                   expiresIn:3600
                })
                res.status(200).send({auth:true,token,message:'user found & login'})
            }
        })(req,res,next)
    })


    app.get('/protected-rote',passport.authenticate('jwt',{session:false}),(req,res)=>{
        res.status(200).send(req.user)
    })




}