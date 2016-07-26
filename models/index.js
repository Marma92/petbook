var sequelize = require("./sequelize");
var Users = require("./Users");
var Races = require("./Races");
var Pets = require("./Pets");


//FOREIGN KEY
Users.hasMany(Pets);
Races.hasMany(Pets);


sequelize.sync();

module.exports = {
    "sequelize" : sequelize,
    "Users" : Users,
    "Races" : Races,
    "Pets" : Pets,
};
