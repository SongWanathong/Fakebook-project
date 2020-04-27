const passport = require('passport')
module.exports = (app, db) => {
  app.post('/create-post', passport.authenticate('jwt',
    { session: false }),
    (req, res) => {

      if(!req.files){


        db.post.create({
          user_id: req.user.id,
          message: req.body.message
        }).then(result => {
          res.status(201).send(result)
        }).catch((err) => {
          console.log(err)
          res.status(400).send({ message: err.message })
        })


      }else{
        const picture = req.files.photoPost
        const picturename = `${req.user.id}${(new Date()).getTime()}.jpeg`
        picture.mv('./upload/'+picturename)
          
        res.send({
          status:true,
          message:'file is upload',
          data:{
            name:picturename,
            size:picture.size
          }
        })

        db.post.create({
          user_id: req.user.id,
          message: req.body.message,
          image_url: `http://localhost:8080/${picturename}`
        }).then(result => {
          res.status(201).send(result)
        }).catch((err) => {
          console.log(err)
          res.status(400).send({ message: err.message })
        })


      }





     

    })

  app.get('/post-list', passport.authenticate('jwt',
    { session: false }),
    function (req, res) {
      db.post.findAll({
        include: [

          { model: db.user, as: 'author', attributes: ['id', 'name', 'profile_img_url'] },
          { model: db.comment, as: 'commentList', include: [{ model: db.user, attributes: ['id', 'name', 'profile_img_url'] }] }
        ]
      })
        .then(result => {
          res.status(200).send(result)
        })
        .catch(err => {
          console.error(err);
          res.status(400).send({ message: err.message })
        })
    })


  app.put('/update-post/:post_id', passport.authenticate('jwt', { session: false }),
    async (req, res) => {

      const targetPost = db.post.findOne({ where: { id: req.params.post_id, user_id: req.user.id } })
      if (!targetPost) {
        res.status(404).send({ message: 'post not fouded' })
      } else if (targetPost.user_id !== req.user.id) {
        res.status(401).send({ message: 'post not founded' })
      } else {
        targetPost.update({
          message: req.body.message,
          image_url: req.body.image_url
        })
        res.status(200).send({ message: `post id :${req.params.post_id} has been updated` })
      }
    })

  
  app.delete('/delete-post/:id', passport.authenticate('jwt', { session: false }),
    async function (req, res) {
      let targetPost = await db.post.findOne({ where: { id: req.params.id, user_id: req.user.id } })
      if (!targetPost) {
        res.status(400).send({ message: "post is not found" })
      } else {
        targetPost.destroy()
        res.status(200).json({ message: "success" })
      }
    })

  app.get('/my-posts', passport.authenticate('jwt', { session: false }),
    (req, res) => {

      db.post.findAll({
        where: { user_id: req.user.id },
        include: [

          { model: db.user, as: 'author', attributes: ['id', 'name', 'profile_img_url'] },
          { model: db.comment, as: 'commentList', include: [{ model: db.user, attributes: ['id', 'name', 'profile_img_url'] }] }
        ]
      }).then(result => {
        res.status(200).send(result)
      })
        .catch(err => {
          res.status(400).send({ message: err.message })
        })
    })

  app.get('/feed', passport.authenticate('jwt', { session: false }),
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
      const postIds = requestToid.concat(requestFromid).concat(req.user.id)

      db.post.findAll({
        where: { user_id: postIds },
        include: [

          { model: db.user, as: 'author', attributes: ['id', 'name', 'profile_img_url'] },
          { model: db.comment, as: 'commentList', include: [{ model: db.user, attributes: ['id', 'name', 'profile_img_url'] }] }
        ]
      }).then(result => {
        res.status(200).send(result)
      }).catch(err => {
          res.status(400).send({ message: err.message })
        })
    })



    


}
