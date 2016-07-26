
module.exports = function(app, models, passport){

	require("./index")(app);
	require("./login")(app, passport);
	require("./signup")(app, models);
	require("./profile")(app, models);
	require("./uploadPictureProfile")(app, models);
	require("./search")(app);
	require("./options")(app);
	require("./home")(app, models);
	require("./logout")(app);
	require("./pet")(app, models);
	require("./friends")(app);
	require("./addPet")(app, models);


}
