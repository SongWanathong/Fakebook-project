const passport = require('passport')
const sequelize = require('sequelize')
const Op = sequelize.Op

module.exports = (app, db) => {

    app.get('/friend-request-to/:id', passport.authenticate('jwt', { session: false }),
        (req, res) => {
            db.friend.create({
                request_to_id: req.params.id,
                request_from_id: req.user.id,
                status: 'request',
            }).then(result => {
                res.status(201).send({ message: `Sends Request to friend id ${req.params.id}` })
            }).catch(err => {
                res.status(400).send({ message: err.message })
            })

        })

    app.get('/request-list', passport.authenticate('jwt', { session: false }),
        (req, res) => {

            db.friend.findAll({
                where:
                {
                    request_to_id: req.user.id,
                    status: 'request',
                },
                attributes: [['request_from_id', 'id']]

            })
                .then(result => {
                    const requestFromid = result.map(request => request.id)
                    db.user.findAll({
                        where: {
                            id: requestFromid
                        },
                        attributes: ['id', 'name', 'profile_img_url']
                    }).then(result => {
                        res.status(200).send(result)
                    }).catch(err => {
                        res.status(400).send(err.message)
                    })
                })
        })

    app.get('/friends-list', passport.authenticate('jwt', { session: false }),
        async (req, res) => {

            let requestTolist = await db.friend.findAll({
                where: { request_to_id: req.user.id, status: 'friend' },
                attributes: [['request_from_id', 'id']]
            })
            const requestFromid = requestTolist.map(request => request.id)
            let requestFromlist = await db.friend.findAll({
                where: { request_from_id: req.user.id, status: 'friend' },
                attributes: [['request_to_id', 'id']]
            })
            const requestToid = requestFromlist.map(request => request.id)
            const frienId = requestToid.concat(requestFromid)
            db.user.findAll({
                where: {
                    id: frienId
                },
                attributes:['id','name','profile_img_url']

            }).then(result => { res.send(result) }).catch(err => {
                res.send(err.message)
            }) })
    // app.get('/denied-friend')




    app.get('/accep-friend-request/:id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
  
      db.friend.findOne({where:{
          status:'request',
          request_from_id:req.params.id,
          request_to_id:req.user.id
      }}).then(result=>{
        result.update({
            status:'friend'
        })
          res.status(201).send({message:'request has been deny'})
      }).catch(err=>{
          res.status(400).send({message:err.message})
      })
  
  
    })
    
    app.get('/deny-friend-request/:id',passport.authenticate('jwt',{session:false}),
    (req,res)=>{
  
       db.friend.findOne({where:{
          status:'request',
          request_from_id:req.params.id,
          request_to_id:req.user.id
      }}).then(result=>{
        result.destroy()
          res.status(201).send({message:'request has been deny'})
      }).catch(err=>{
          res.status(400).send({message:err.message})
      })
        
    })
  
    
    app.delete('/delete-friend/:id',passport.authenticate('jwt',{session:false}),
    async (req,res)=>{
  
      let friendtarget = await db.friend.findOne(
          {where:{[Op.or]:[{request_to_id:req.params.id,request_from_id:req.user.id,status:'friend'},
                      {request_to_id:req.user.id,request_from_id:req.params.id,status:'friend'}
      ]}}
      ).catch(err=>{
          res.send(err.message)
          
      })
  
      if(!friendtarget){
          res.status(404).send({message:'friend not found'})
      }
  
      friendtarget.destroy().then(result =>{
          res.status(201).send({message:'friend has been delete'})
      }).catch(err=>{
         res.status(400).send({message:err.message})
      })
  
  
  
        
    })
  
  




}