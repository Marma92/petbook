var sequelize = require("./sequelize");

module.exports = sequelize.import("users", function(sequelize, Datatypes) {
    return sequelize.define("Users", {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Datatypes.STRING
        },
        password: {
            type: Datatypes.STRING
        },
        admin: {
            type: Datatypes.INTEGER
        },
        firstName: {
            type: Datatypes.STRING
        },
        name: {
            type : Datatypes.STRING
        },
        picture: {
            type : Datatypes.STRING
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