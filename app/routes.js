
module.exports = function(app, models, passport){
	
	require("./index")(app);
	require("./login")(app, passport);
	require("./signup")(app, models);
	require("./profile")(app, models);
	require("./uploadPictureProfile")(app, models);
	require("./search")(app, models);
	require("./options")(app);
	require("./logout")(app);
	require("./home")(app, models);
	require("./postnews")(app, models);
	require("./pet")(app, models);
	require("./friends")(app, models);
	require("./addPet")(app, models);
	require("./myPet")(app, models);


}