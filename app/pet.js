module.exports = function(app){

  // =====================================
  // PET SECTION ========================
  // =====================================

  app.get('/pet', function(req, res){
  	res.render('pet.ejs');
  });

}