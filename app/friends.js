module.exports = function(app){

  // =====================================
  // HOME SECTION ========================
  // =====================================

  app.get('/friends', function(req, res){
  	res.render('friends.ejs');
  });

}