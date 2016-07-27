module.exports = function(app, models){

    var msgSearch =""
    var ListPets ="";
    var MyListPets ="";
    var ListRaces ="";
  // =====================================
  // SEARCH SECTION ======================
  // =====================================
    app.get('/search', function(req, res){
        if (req.isAuthenticated()){
  	        res.render('search.ejs', {msgSearch : msgSearch, ListPets : ListPets, MyListPets : MyListPets, ListRaces : ListRaces});
  	    }else{
  	        res.redirect("/")
  	    }

    });


     app.post('/search', function(req, res){
        if (req.isAuthenticated()){

            Pets = models.Pets
            var request = {
                attributes: ['id', 'name', 'sex', 'picture', 'age', 'user_id', 'race_id'],
                where: {
                    name : {
                         $like: '%'+req.body.search+'%'
                    },
                },
                order: ['name']
            };

            var myPets = models.Pets
            var requestMyPets = {
                 attributes: ['id', 'name'],
                 where: {
                    user_id : req.user.id
                 },
                 order: ['name']
            };

             //load races list
             var Races = models.Races;
             var requestRaces = {
                attributes: ['id', 'name'],
                order: ['name']
             };
             Races.findAll(requestRaces).then(function(resultatRaces){
                ListRaces = resultatRaces;
            }).then(myPets.findAll(requestMyPets).then(function(resultsMyPet){
                MyListPets = resultsMyPet;

            }).then(Pets.findAll(request).then(function(results){
                ListPets = results
                res.render('search.ejs', {msgSearch : msgSearch, ListPets : ListPets, MyListPets : MyListPets, ListRaces : ListRaces } );
            })));


  	    }else{
  	        res.redirect("/")
  	    }

     });

     app.post('/search/addFriend', function(req, res){
         if (req.isAuthenticated()){

            Friends = models.Friends

            if(!req.body.idMyPet){
                msgSearch="Veuillez séléctionner un de vos animaux !"
            }else if(req.body.id == req.body.idMyPet){
                msgSearch ="Vous ne pouvez pas être ami avec vous même !"
            }else{

                var requestTest ={
                    attributes: ['idFriends'],
                    where: {
                        idFriends: req.body.id ,
                         pet_id: req.body.idMyPet,
                        }
                };


                //check if friends
                Friends.findAll(requestTest).then(function(resultsTestFriends){

                    if(resultsTestFriends.length>0){
                        msgSearch = "Déjà ami"

                    }else{
                        Friends.create({
                            idFriends: req.body.id,
                            pet_id : req.body.idMyPet,
                            type : "progress"
                        })
                        Friends.create({
                            idFriends: req.body.idMyPet,
                            pet_id : req.body.id,
                            type : "request"
                        })

                        msgSearch = "Demande d'ami envoyée";

                    }
                });



            }
            res.redirect('/search' );
         }else{
            res.redirect("/")
         }

     });

}