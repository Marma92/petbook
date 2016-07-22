
module.exports = function(app, passport, ListFunction){
	
	require("./index")(app, passport);
	require("./login")(app, passport);
	require("./signup")(app, passport);
	require("./profile")(app, passport, ListFunction);
	require("./search")(app, passport);
	require("./options")(app, passport);
	require("./home")(app, passport);
	require("./logout")(app, passport);
	require("./pet")(app, passport);
	require("./friends")(app, passport);
	require("./addPet")(app, passport);
}