module.exports = function(app, passport){

	var mongoose = require('mongoose');
	var User = require('../models/user');
	var Post = require('../models/post');
	var Animal = require('../models/animal');

	// route middleware to make sure
	function isLoggedIn(req, res, next) {

		// if user is authenticated in the session, carry on
		if (req.isAuthenticated())
			return next();

		// if they aren't redirect them to the home page
		res.redirect('/');
	}

	function addAnimal(req, res, next){
		var animal = new Animal({
			//todo
		});
		animal.save(function(err){
			if(err) return false;
			console.log("L'animal " + animal.name + " a bien été créé");
		})

	}

	function updateAnimal(req, animal, res, next){
		var animal = new Animal({

		});
		animal.findOneAndUpdate(animal.animalId, function(err){
			if (err){
				return done(null, false, err);
				console.log("Erreur " + err);
			} else{
				console.log('Animal saved successfully!');
			}
			//animal.name = 'username'
			//todo

			animal.save(function(err){
				if (err){console.log(err);} else{ console.log('User saved successfully!');}
				console.log("The new user is : " + newUser.username);
			})
		})

	}

	function deleteAnimal(animal, req, res, next){
		animal.findOneAndDelete(animal.name, function(err){
			
		})
		animal.save(function(err){
			if(err) return false;
			console.log("L'animal " + animal.name + " a bien été créé");
		})

	}

	function giveAnimal(req, res, next){
		var animal = new Animal({

		});
		animal.save(function(err){
			if(err) return false;
			console.log("L'animal " + animal.name + " a bien été créé");
		})

	}
	
}