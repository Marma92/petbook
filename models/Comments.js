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
            type: Datatypes.Date
        },
        meta : {
            likesCount : {
                type : Datatypes.Number
            }
        }
    }, {
        classMethods : {
            associate : function(models){
                Pet.belongsTp(models.Post, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
            }
        }
    }, {
            paranoid: true,
            freezeTableName: true,
            underscored: true
        });
});