const passport = require('passport')
const jwt = require('jsonwebtoken')
const jwtOptins = require('../config/passport/passport')
const bcrypt = require('bcryptjs')
const BCRYPT_SALT_ROUNDS = 12

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
                console.log('asdasd')
                console.log(user)
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
                const token = jwt.sign({
                    id:user.id,
                    role:user.role,
                    name:user.name,
                    profile_img_url:user.profile_img_url,
                },
                jwtOptins.secretOrkey,{
                   expiresIn:3600
                })
                res.status(200).send({
                    auth:true,
                    token,
                    message:'user found & login'
                })
            }
        })(req,res,next)
    })


    app.get('/protected-rote',passport.authenticate('jwt',{session:false}),(req,res)=>{
        res.status(200).send(req.user)
    })

    
    app.get('/change-password',passport.authenticate('jwt',{session:false}),(req,res)=>{
        
    })

    
    
  app.get('/user/:id', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    const userId = req.user.id
    const friendId = req.params.id
    let requestFromUser = await db.friend.findOne({
      attributes: [['request_from_id', 'id'], 'status'],
      where: { request_from_id: req.params.id, request_to_id: userId },
      raw: true,
    })

    let requestToUser = await db.friend.findOne({
      attributes: [['request_to_id', 'id'], 'status'],
      where: { request_from_id: userId, request_to_id: req.params.id },
      raw: true,
    })

    if (requestFromUser && requestFromUser.id == friendId && requestFromUser.status == "request") {
      const user = await getUserInfo(requestFromUser.id)
      res.status(200).send({ ...user, statusName: 'รอคำตอบรับจากคุณ' })
    } else if (requestToUser && requestToUser.id == friendId && requestToUser.status == "request") {
      const user = await getUserInfo(requestToUser.id)
      console.log(user)
      res.status(200).send({ ...user, statusName: 'ขอเป็นเพื่อนแล้ว' })
    } else if (requestFromUser && requestFromUser.id == friendId && requestFromUser.status == "friend") {
      const user = await getUserInfo(requestFromUser.id)
      res.status(200).send({ ...user, statusName: 'เพื่อน' })
    } else if (requestToUser && requestToUser.id == friendId && requestToUser.status == "friend") {
      const user = await getUserInfo(requestToUser.id)
      res.status(200).send({ ...user, statusName: 'เพื่อน' })
    } else {
      let targetUser = await db.user.findOne({ attributes: ['id', 'name'], raw: true, where: { id: req.params.id } })
      if (!targetUser) {
        res.status(404).send({ message: "user not found" })
      } else {
        console.log({ targetUser })
        res.status(200).send({ ...targetUser, statusName: 'ขอเป็นเพื่อน' })
      }
    }
  });

app.put('/change-password', passport.authenticate('jwt', { session: false }),
  async function (req, res) {
    let targetUser = await db.user.findOne({ where: { id: req.user.id } })
    if (!targetUser) {
      res.status(404).send({ message: "user not found" })
    } else {
      var salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS);
      var newHashedPassword = bcrypt.hashSync(req.body.newPassword, salt);
      bcrypt.compare(req.body.oldPassword, req.user.password, function (err, response) {
        console.log({ response })
        if (!response) {
          res.status(401).send({ message: 'your old password is wrong.' })
        } else {
          targetUser.update({
            password: newHashedPassword
          })
          res.status(200).send({ message: "Your password is changed." })
        }
      });
    }
  })

  app.put('/upload-profilepic', passport.authenticate('jwt',
    { session: false }),
    async (req, res) => {

      if(!req.files){
        res.send({
          status: false,
          message: 'No file uploaded'
        })
      }else{
    let targetUser = await db.user.findOne({ where: { id: req.user.id } })
        const picture = req.files.photoPost
        const picturename = `${req.user.id}${(new Date()).getTime()}.jpeg`
        picture.mv('./upload/'+picturename)
        // res.send({
        //   status:true,
        //   message:'file is upload',
        //   data:{
        //     name:picturename,
        //     size:picture.size
        //   }
        // })
        targetUser.update({
          profile_img_url: `http://localhost:8080/${picturename}`
        }).then(result => {
          res.status(201).send(result)
        }).catch((err) => {
          console.log(err)
          res.status(400).send({ message: err.message })
        })
      }
    })



}