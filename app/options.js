module.exports = function(app){

  // =====================================
  // OPTIONS SECTION =====================
  // =====================================
  app.get('/options', function(req, res){
	res.render('options.js');
  });

}
