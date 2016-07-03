module.exports = function(app, passport){


  // =====================================
  // SEARCH SECTION ======================
  // =====================================
  app.get('/search', function(req, res){
  	res.render('search.ejs');
  });

}
