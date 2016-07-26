module.exports = function(app, models){

    // =====================================
    // PET SECTION ========================
    // =====================================

    var ListPets="";
    var msgError = "";
    var listRaces = "";
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

}