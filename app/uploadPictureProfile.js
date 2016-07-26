module.exports = function(app, models, passport){

    var path = require('path');
    var crypto = require ("crypto")
    var multer  =   require('multer');

    var fs = require("fs");



    // =====================================
	// PROFILE SECTION =========================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/uploadPictureProfile', function(req, res) {

		if (req.isAuthenticated()){
            var msgError = "";

            res.render('uploadPictureProfile.ejs', {msgError : msgError});
		}else{
		    res.redirect('/')

		}
	});


	app.post('/uploadPictureProfile', function(req, res) {

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
                    var Users = models.Users;

                    var request = {
                        attributes: ['picture'],
                        where: {
                            username : req.user.username
                        }
                    };

                    Users.find(request).then(function(resultats){
                          var filePath = "photo_profil/"+ resultats.picture;
                          fs.unlinkSync(filePath);
                    });

                    Users.update({
                        picture : req.user.username +"/"+ req.file.originalname
                    }, {
                       where: {
                        username: req.user.username
                       }
                    });
                }else{
                    var filePath = "photo_profil/"+req.user.username +"/"+ req.file.originalname;
                    fs.unlinkSync(filePath);
                    msgError = "Ce fichier n'est pas une image !"
                }
                if(msgError==""){
                    res.redirect('/profile')
                }else{
                    res.render('uploadPictureProfile.ejs', {msgError : msgError});
                }

            });


    	}else{
            res.redirect('/')

    	}
    });

}