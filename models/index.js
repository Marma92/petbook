var sequelize = require("./sequelize");
var Users = require("./Users");
var Races = require("./Races");
var Pets = require("./Pets");
var Posts = require("./Posts");
var Comments = require("./Comments");
var Friends = require("./Friends");


//FOREIGN KEY
Users.hasMany(Pets);
Races.hasMany(Pets);
Pets.hasMany(Posts);
Pets.hasMany(Comments);
Posts.hasMany(Comments);
Pets.hasMany(Friends);


sequelize.sync();

module.exports = {
    "sequelize" : sequelize,
    "Users" : Users,
    "Races" : Races,
    "Pets" : Pets,
    "Posts" : Posts,
    "Comments" : Comments,
    "Friends" : Friends

};
