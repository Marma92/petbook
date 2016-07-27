var sequelize = require("./sequelize");

module.exports = sequelize.import("friends", function(sequelize, Datatypes) {
      return sequelize.define("Friends", {
           id: {
               type: Datatypes.BIGINT,
               primaryKey: true,
               autoIncrement: true

           },
           idFriends: {
                type: Datatypes.BIGINT,


           },
           type: {
                type: Datatypes.STRING
           }

      }, {
               paranoid: true,
               freezeTableName: true,
               underscored: true
      });
});