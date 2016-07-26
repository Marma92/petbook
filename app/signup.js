module.exports = function(app, models){

    var passwordHash = require('password-hash');
    var msgError="";
    var bcrypt = require('bcrypt-nodejs');
    var mkdirp = require ("mkdirp")
	// =====================================
	// SIGNUP ==============================
	// =====================================
	// show the signup form
	app.get('/signup', function(req, res, next) {


		// render the page and pass in any flash data if it exists
		res.render('signup.ejs', {msgError: ""});
	});

	// process the signup form
	app.post('/signup', function (req, res, next) {

        if (!req.body.username){
            msgError = "Veuillez saisir un login !"
        }else if (!req.body.password){
            msgError = "Veuillez saisir un mot de passe !"
        }else if(!req.body.passwordConfirm){
            msgError = "Veuillez retaper votre mot de passe"
        }else if(req.body.password!=req.body.passwordConfirm){
            msgError = "Les mots de passe saisient ne sont pas identiques !"
        }else if(!req.body.firstName){
            msgError = "Veuillez saisir votre nom ! "
        }else if(!req.body.name){
             msgError = "Veuillez saisir votre prénom ! "
        }else if(!req.body.age){
             msgError = "Veuillez saisir votre age ! "
        }else if(!req.body.bio){
            msgError = "Veuillez saisir votre bio ! "
        }else{


            var User = models.Users;

            var requestIfExist = {
                attributes: ['username'],
               	where: {
               		username : req.body.username,
               	}
            };

            User.findAll(requestIfExist).then(function(results) {
                if(results.length>0){
                    msgError = "Identifiant non disponible"
                }else{
                    var dir = "photo_profil/"+req.body.username;
                    var dirDfaut = "default.jpg";
                    User.create({
                        username: req.body.username,
                        password: bcrypt.hashSync(req.body.password, null, null),
                        admin : 0,
                        firstName : req.body.firstName,
                        name : req.body.name,
                        picture : dirDfaut,
                        age : req.body.age,
                        bio : req.body.bio

                    })


                    mkdirp(dir, function(err) {

                        // path exists unless there was an error

                    });
                }
            });



        }


        if(msgError == ""){
            res.redirect('/');
        }else{
            res.render('signup.ejs',{msgError: msgError});
        }

	});





};