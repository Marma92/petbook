var sequelize = require("./sequelize");

module.exports = sequelize.import("post", function(sequelize, Datatypes) {
    return sequelize.define("Post", {
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
        link: {
            type: Datatypes.STRING
        },
        publishedDate: {
            type : Datatypes.Date
        },
        visible : {
            type : Datatypes.Boolean,
            defaultValue : false
        },
        meta : {
            likesCount : {
                type : Datatypes.Number
            }
        }
    },  {
        classMethods : {
            associate : function(models){
                Pet.belongsTp(models.Pet, {
                    onDelete : "CASCADE",
                    foreignKey : {
                        allowNull : false
                    }
                });
            }
        }
    },{
            paranoid: true,
            freezeTableName: true,
            underscored: true
        });
});