

module.exports = function(app, passport, listFunction){
	
	require("./index")(app, passport);
	require("./login")(app, passport);
	require("./signup")(app, passport);
	require("./profile")(app, passport, listFunction);
	require("./search")(app, passport);
	require("./options")(app, passport);
	require("./home")(app, passport);
	require("./logout")(app, passport);

}

/*
	// route middleware to make sure
	function isLoggedIn(req, res, next) {
		console.log("test");
		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}
*/