var sequelize = require("./sequelize");

module.exports = sequelize.import("comments", function(sequelize, Datatypes) {
    return sequelize.define("Comments", {
        id: {
            type: Datatypes.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        content: {
            type: Datatypes.TEXT
        },
        publishedDate: {
            type: Datatypes.DATE
        }
    }, {
            paranoid: true,
            freezeTableName: true,
            underscored: true
        });
});