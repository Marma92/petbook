var express = require('express');
var mongoose = require('mongoose')
    , Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')

var db = mongoose.connection;

autoIncrement.initialize(db);

/**SCHEMA*/
//User table
var schemaUser = new Schema ({
    userId : {type : Number, unique: true},
    firstName : String,
    name : String,
    userName : {type : String, unique: true},
    picture : String,
    age : Number,
    bio : String,
    mail : String,
    meta : {
        animal : [Number],
        friends : Number
    },
    seq : {type:Number, default: 0}
});

/**MODEL*/
schemaUser.plugin(autoIncrement.plugin, {
    model : 'User',
    field : 'userId',
    startAt : 0,
    incrementBy: 1
});

var User = mongoose.model("User", schemaUser);
schemaUser.set('autoIndex', false);

/**IMPORT MODULE*/
module.exports = User;

/**METHOD*/
schemaUser.statics.findByName = function(name, cb){
    return this.find({userName : new RegExp(name, 'i')}, cb);
};

/*
//Test of creation to populate the database
var tasty = new User({
    username: "test"
});

tasty.save(function(err){
    console.log(tasty.username);
});*/