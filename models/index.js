var sequelize = require("./sequelize");
var Users = require("./Users");
var Races = require("./Races");
var Pets = require("./Pets");
var Posts = require("./Posts");


//FOREIGN KEY
Users.hasMany(Pets);
Races.hasMany(Pets);
Pets.hasMany(Posts);


sequelize.sync();

module.exports = {
    "sequelize" : sequelize,
    "Users" : Users,
    "Races" : Races,
    "Pets" : Pets,
    "Posts" : Posts,
};
