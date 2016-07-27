module.exports = function(app, models){

  // =====================================
  // HOME SECTION ========================
  // =====================================

    var msg = "";
    var tFriends=[];
    var tMyPets = ""
    var listRaces="";


  app.get('/friends', function(req, res){
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
                var requestPets = {
                    where :{
                        user_id : req.user.id
                    },
                    order: ['name']
                };

                Pets.findAll(requestPets).then(function(resultPets){

                    tMyPets = resultPets;
                    for (var b = 0 ; b<resultPets.length; b++){


                        Friends = models.Friends
                        var lPets = models.Pets;
                            var requestPets2 = {

                                order: ['name'] ,
                                include: [{
                                    model: Friends,
                                    where :{
                                        idFriends : resultPets[b].id
                                     },

                                }]
                             };

                        Pets.findAll(requestPets2).then(function(resultPets2){

                            tFriends[tFriends.length]= resultPets2;

                        })
                     }



                }).then(function(){
					res.render('friends.ejs', {msg : msg, ListRaces : listRaces, tFriends : tFriends, tMyPets});
				});



               



            });

    		}else{
    		    res.redirect('/')
    		}
  });

}