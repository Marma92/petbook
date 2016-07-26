var sequelize = require("./sequelize");

module.exports = sequelize.import("posts", function(sequelize, Datatypes) {
    return sequelize.define("Posts", {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatypes.STRING
        },
        content: {
            type: Datatypes.TEXT
        },
        publishedDate: {
            type : Datatypes.DATE
        },
        nbLike: {
            type : Datatypes.BIGINT
        }

    },{
            paranoid: true,
            freezeTableName: true,
            underscored: true
        });
});