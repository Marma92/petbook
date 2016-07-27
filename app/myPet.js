module.exports = function(app, models){

	var myProfile = "";
	var listPost = "";
	var msg="";
  // =====================================
	// TIMELINE SECTION ====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	// we will use route middleware to verify this (the isLoggedIn function)
	app.get('/myPet', function(req, res, next) {
	});

	// process the profile form
	
	app.post('/myPet', function(req, res, next) {
    	if (req.isAuthenticated()){
			var Pets = models.Pets;
			var Posts = models.Posts;
			var request = {
				attributes: ['name','id', 'sex','age', 'picture', 'bio'],
				where:{
					id : req.body.id
				}
			}
			
			var requestPost = {
                attributes: ['id', 'content', 'publishedDate', 'destinataire', 'nbLike'],
                where:{
                   destinataire : req.body.id
                }
            };
			
			Pets.find(request).then(function(results){
				myProfile = results
				
			}).then(Posts.findAll(requestPost).then(function(resultatPost){
                listPost=resultatPost;
               
            })).then(function(){
				 res.render('myPet.ejs', {msg : msg , myProfile : myProfile , listPost : listPost});
			}); 
       
	   }else{
   
         res.redirect("/")
       } 


	});
	
	app.post('/myPet/addComment', function(req, res, next) {
		if (req.isAuthenticated()){
			
			
		
		}else{
			res.redirect("/")
		}
		
		
	}

}
