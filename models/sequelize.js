var Sequelize = require("sequelize");

module.exports = new Sequelize("petbook", "root", "root", {
    pool : false,
    host : "localhost",
    port : 3306

});