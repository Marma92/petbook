module.exports = function(app, passport){
	require("./home")(app, passport);
    require("./login")(app, passport);
	require("./signup")(app, passport);
	require("./profile")(app, passport);
	require("./logout")(app, passport);
}