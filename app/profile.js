module.exports = function(app, passport){

    // =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile.ejs', {
			user : req.user // get the user out of session and pass to template
		});
	});

	// process the profile form
	app.post('/profile', passport.authenticate('local-update', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '/profile', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
}