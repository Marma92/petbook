module.exports = function(app){

  // =====================================
  // HOME SECTION ========================
  // =====================================

  app.get('/home', function(req, res){
  	res.render('home.ejs');
  });

}
