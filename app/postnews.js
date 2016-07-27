module.exports = function(app, models){

  app.post('/postnews', function(req, res){
    if (req.isAuthenticated()){
      var Post = models.Posts;
      Post.create({
        content: req.body.content,
        publishedDate : Date.now(),
        nbLike : 0,
        pet_id : req.body.pet
      }).then(function(){
        res.redirect('/home');
        console.log('it worked !')
      });
    }else{
      res.redirect('/');
    }
  });
}
