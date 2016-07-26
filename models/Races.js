var sequelize = require("./sequelize");

module.exports = sequelize.import("races", function(sequelize, Datatypes) {
    return sequelize.define("Races", {
           id: {
               type: Datatypes.BIGINT,
               primaryKey: true,
               autoIncrement: true
           },
           name: {
               type: Datatypes.STRING
           }
       }, {
               paranoid: true,
               freezeTableName: true,
               underscored: true
           });
});