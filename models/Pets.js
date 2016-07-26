var sequelize = require("./sequelize");

module.exports = sequelize.import("pets", function(sequelize, Datatypes) {
    return sequelize.define("Pets", {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING
        },
        sex: {
            type: Datatypes.STRING
        },
        picture:{
            type: Datatypes.STRING
        },
        age:{
            type : Datatypes.INTEGER
        },
        bio : {
            type : Datatypes.TEXT
        }

    }, {
            paranoid: true,
            freezeTableName: true,
            underscored: true
        });
});
