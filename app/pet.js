module.exports = function(app, models){

    // =====================================
    // PET SECTION ========================
    // =====================================

    var ListPets="";
    var msgError = "";
    var listRaces = "";
    var namePet ="";
    var multer  =   require('multer');
    var path = require('path');
    var crypto = require ("crypto");
    var fs = require("fs");

  app.get('/pet', function(req, res){

        if (req.isAuthenticated()){



            //load races list
            var Races = models.Races;
            var request = {
                attributes: ['id', 'name'],
                order: ['name']
            };



            Races.findAll(request).then(function(resultat){
                listRaces=resultat;

                 var Pets = models.Pets;
                 var request2 = {
                    attributes: ['id', 'name', 'sex', 'picture', 'age', 'bio', 'race_id'],
                    order: ['name'],
                    where: {
                        user_id : req.user.id
                    }
                 };

                Pets.findAll(request2).then(function(ListPets){
                    res.render('pet.ejs', {msgError : msgError, ListPets : ListPets, ListRaces : listRaces});
                });


            });

		}else{
		    res.redirect('/')
		}
  });



    //UPDATE PICTURE/////////////////////////////////////////////////////////////////////////////////////////////
    app.get('/pet/:id/picture', function(req, res){

        if (req.isAuthenticated()){
            var msgError = "";
            res.render('petUpdatePicture.ejs', {msgError : msgError, id : req.params.id });

    	}else{
  		    res.redirect('/')
  		}
    });

    app.post('/pet/updatePicture', function(req, res) {

    	if (req.isAuthenticated()){
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
            var msgError = "";
            var fileNewFile = "";
            upload(req,res,function(err) {
                var type = req.file.mimetype.substring(0, req.file.mimetype.indexOf('/'));

                if(type == "image"){
                    //check if exist in Plugin
                    var Pets = models.Pets;

                    var request = {
                        attributes: ['name', 'picture'],
                        where: {
                            id : req.body.id
                        }
                    };

                    Pets.find(request).then(function(resultats){
                        namePet = resultats.name;
                        console.log("dans le find " + namePet);
                        var filePath = "photo_profil/"+ resultats.picture;
                        fs.unlinkSync(filePath);
                        Pets.update({
                            picture : namePet +"/"+ req.file.originalname
                        }, {
                            where: {
                                id: req.body.id
                            }
                        });

                         //deplacement du fichier dans celui de la bestiole
                        var source = fs.createReadStream("photo_profil/"+req.user.username+"/"+req.file.originalname);
                        var dest = fs.createWriteStream("photo_profil/"+req.user.username + "/" + namePet +"/"+req.file.originalname);
                        source.pipe(dest);
                        source.on('end', function() { /* copied */ });
                        source.on('error', function(err) { /* error */ });


                    });


                }else{
                    var filePath = "photo_profil/"+req.user.username +"/"+ req.file.originalname;
                    fs.unlinkSync(filePath);
                    msgError = "Ce fichier n'est pas une image !"
                }
                if(msgError==""){




                    res.redirect('/pet')
                }else{
                     res.render('petUpdatePicture.ejs', {msgError : msgError, id : req.body.id});
                }

            });


    	}else{
            res.redirect('/')

    	}
    });



}