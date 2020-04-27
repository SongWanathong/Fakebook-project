
const env = process.env.NODE_ENV || 'development'
const config = require('../config.json')[env]
const bcrypt = require('bcryptjs')

const BCRYPT_SALT_ROUNDS = 12
const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const JWTStrategy = require('passport-jwt').Strategy
const extractJwt = require('passport-jwt').ExtractJwt
const db = require('../../models')

let jwtoption = {}

jwtoption.secretOrkey = 'c0d3c4mp4'

passport.use('register', new localStrategy(
    {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
    }, (username, password, done) => {
        db.user.findOne({
            where: { username: username }
        }).then(user => {
            if (user != null) {
                console.log('user name alredy taken')
                return done(null, false, { message: 'username already taken' })
            } else {
                let salt = bcrypt.genSaltSync(BCRYPT_SALT_ROUNDS)
                let hashedPassword = bcrypt.hashSync(password, salt)
                db.user.create({ username, password: hashedPassword }).then((user) => {
                    console.log('user created')
                    return done(null, user)
                }).catch(err => {
                    console.error(err);
                    return done(err)

                })
            }
        })
    }
))


passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
}, async (username, password, done) => {
  let user = await db.user.findOne({where:{username}})

 if(user ==null){
     return done(null,false,{message:'username or password incorrect'})
 }

 bcrypt.compare(password,user.password,(err,res)=>{
     if(err){
         console.error(err);
         done(err)
     }
     if(!res){
         return done(null,false,{message:'username or password incorrect'})
     }
     console.log(`user ${user.id} is found & authenticated`)
     return done(null,user)
 })
}
))

const opts ={
    jwtFromRequest:extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey:jwtoption.secretOrkey
}

passport.use('jwt',new JWTStrategy(opts,(jwt_payload,done)=>{
    db.user.findOne({where:{id:jwt_payload.id}}).then(user=>{
        if(user){
            console.log('user found')
          return  done(null,user)
        }else{
            console.log("user not found")
           return done(null,false)
        }
    })
}))


module.exports = jwtoption