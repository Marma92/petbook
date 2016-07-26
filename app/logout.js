module.exports = function(app){

	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res, next) {

		req.logout();

		res.redirect('/');
	});
	
}