module.exports = function(app, models){

    // =====================================
	// HOME SECTION ========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/home', function(req, res) {

        if (req.isAuthenticated()){
						var Pets = models.Pets;
						var request = {
							attributes: ['name','id'],
							where:{
								user_id : req.user.id
							}
						};
						Pets.findAll(request).then(function(results){
								console.log(results);
								res.render('home.ejs',{
									user: req.user,
									pets: results
								});
						});
		}else{
		    res.redirect('/')

		}

	});

}