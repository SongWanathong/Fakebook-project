const passport = require('passport');
const Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports =(app,db)=>{


  app.post('/create-comment/:post_id',passport.authenticate('jwt',{session:false}),
  (req,res)=>{
      db.comment.create({
          message:req.body.message,
          post_id:req.params.post_id,
          user_id:req.user.id
      }).then(result =>{
          res.status(200).send(result)
      }).catch(err=>{
          res.status(400).send({message:err.message})
      })
  })



  app.post('/update-comment/:comment_id',passport.authenticate('jwt',{session:false}),
  async (req,res)=>{

    let targetComment = await db.comment.findOne({where:{id:req.params.comment_id}})
    if(!targetComment){
        res.status(404).send({message:'comment not found'})
    }else if(targetComment.user_id !== req.user.id){
        res.status(401).send({message:'Unauthorized'})
    }else{
        targetComment.update({message:req.body.message})
        res.status(200).send({message:`Comment ${req.params.comment_id} has been update`})
    }



    
  })



  app.delete('/delete-comment/:comment_id',passport.authenticate('jwt',{session:false}),
   async (req,res)=>{

    let targetComment = await db.comment.findOne({where:{id:req.params.comment_id}})
    if(!targetComment){
        res.status(404).send({message:'comment not found'})
    }else if(targetComment.user_id !== req.user.id){
        res.status(401).send({message:'Unauthorized'})
    }else{
        targetComment.destroy()
        res.status(200).send({message:`Comment ${req.params.comment_id} has been delete`})
    }
  })















}