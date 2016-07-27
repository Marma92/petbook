module.exports = function(app, models){

    // =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/profile', function(req, res, next) {
    	if (req.isAuthenticated()){
            var msgError="";

            var Users = models.Users;
            var request = {
                attributes: ['username','firstName','name','picture','age','bio'],
                where: {
                    username : req.user.username
                }
            };

            Users.find(request).then(function(results){

                 res.render('profile.ejs', {
                    user : results.username,
                    firstName : results.firstName,
                    name : results.name,
                    picture : results.picture,
                    age : results.age,
                    bio : results.bio,
                    msgError : msgError
                 });

            });


        }else{

            res.redirect("/")
        }

	});

		// process the profile form
	app.post('/profile', function(req, res, next) {
	    if (req.isAuthenticated()){
	        msgError="";

            if(!req.body.firstName){
                msgError = "Veuillez saisir votre nom ! "
            }else if(!req.body.name){
                 msgError = "Veuillez saisir votre prénom ! "
            }else if(!req.body.age){
                 msgError = "Veuillez saisir votre age ! "
            }else if(!req.body.bio){
                msgError = "Veuillez saisir votre bio ! "
            }else{

              var Users = models.Users;
              Users.update({
                firstName: req.body.firstName,
                name: req.body.name,
                age: req.body.age,
                bio: req.body.bio,

              }, {
                where: {
                  username: req.user.username
                }
              });


            }

            if (msgError ==""){
                res.redirect("/profile");
            }else{
                Users2 = models.Users;
                var requestFind = {
                    attributes: ['username','firstName','name','picture','age','bio'],
                    where: {
                        username : req.user.username
                    }
                };

                Users2.find(requestFind).then(function(results){

                    res.render('profile.ejs', {
                        user : results.username,
                        firstName : results.firstName,
                        name : results.name,
                        picture : results.picture,
                        age : results.age,
                        bio : results.bio,
                        msgError : msgError
                    });

                });
            }

	    }else{
            res.redirect("/")
	    }


	});
	
}