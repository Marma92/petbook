module.exports = function(app, models){

    var crypto = require ("crypto")
    var multer  =   require('multer');
    var fs = require("fs");
    var mkdirp = require("mkdirp");
    // =====================================
    // HOME SECTION ========================
    // =====================================

    app.get('/addPet', function(req, res){

        if (req.isAuthenticated()){
            var resultListRace="";
            var msgError = "";

            //load races list
            var Races = models.Races;
            var request = {
                attributes: ['id', 'name'],
                order: ['name']
            };

            Races.findAll(request).then(function(resultListRace){
                 res.render('addPet.ejs', {msgError : msgError, resultListRace : resultListRace});
            });

		}else{
		    res.redirect('/')

		}



    });

    app.post('/addPet', function(req, res) {

      	if (req.isAuthenticated()){

            var msgError = "";

            var storage =   multer.diskStorage({
                destination: function (req, file, callback) {
                    callback(null, './photo_profil/'+req.user.username);
                },
                filename: function (req, file, callback) {
                    callback(null, file.fieldname + '-' + Date.now());
                }
            });

            var storage = multer.diskStorage({
                destination: './photo_profil/'+req.user.username,
                filename: function (req, file, cb) {
                    crypto.pseudoRandomBytes(16, function (err, raw) {
                        if (err) return cb(err)
                        cb(null, file.originalname)
                    })
                }
            });


            var upload = multer({ storage : storage }).single('myFile');

            upload(req,res,function(err) {


                if(!req.body.name){
                    msgError = "Veuillez saisir un nom ! "
                }else if(!req.body.race){
                    msgError = "Veuillez saisir une race ! "
                }else if(!req.body.sex){
                    msgError = "Veuillez saisir le sexe ! "
                }else if(!req.body.age){
                    msgError = "Veuillez saisir votre age ! "
                }else if(!req.body.bio){
                    msgError = "Veuillez saisir votre bio ! "
                }else{

                    var type = req.file.mimetype.substring(0, req.file.mimetype.indexOf('/'));

                    var dir = "photo_profil/"+req.user.username+"/"+req.body.name;
                    console.log(dir);
                    mkdirp(dir, function(err) {});



                    if(type == "image"){

                        var Users = models.Users;
                        var requestFind = {
                            attributes: ['id'],
                            where: {
                                username : req.user.username
                            }
                        };

                        Users.find(requestFind).then(function(results){

                            var Pets = models.Pets;
                            var dir = "photo_profil/"+req.user.username+"/"+req.body.name;
                            var dirDfaut = "default.jpg";
                            Pets.create({
                                name : req.body.name,
                                sex : req.body.sex,
                                picture : dir + "/" + req.file.originalname,
                                age : req.body.age,
                                bio : req.body.bio,
                                race_id : req.body.race,
                                user_id : results.id
                            });
                        });

                        res.redirect("/pet");

                    }else{

                        var filePath = "photo_profil/"+req.user.username +"/"+ req.body.name +"/"+ req.file.originalname;
                        fs.unlinkSync(filePath);
                        msgError = "Ce fichier n'est pas une image !"

                    }

                }
            });


      	}else{
              res.redirect('/')

      	}
      });

}