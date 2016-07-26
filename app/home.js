module.exports = function(app, models, passport){

    // =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/home', function(req, res) {
		if (req.isAuthenticated()){
            res.render('home.ejs');
		}else{
		    res.redirect('/')

		}
	});

}