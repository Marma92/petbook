module.exports = function(app){

  // =====================================
  // HOME SECTION ========================
  // =====================================

  app.get('/addPet', function(req, res){
  	res.render('addPet.ejs');
  });

}