var express = require('express');
var mongoose = require('mongoose')
    , Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')

mongoose.connect("mongodb://localhost:27017/petbookDB");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded to MongoDB.");
});
autoIncrement.initialize(db);

/**SCHEMA*/
//Animal table
var schemaAnimal = new Schema({
    animalId : {type : Number, unique: true},
    name : String,
    race :  String,
    sex : String,
    picture : String,
    age : {type: Number, min: 18, max: 50},
    bio : String,
    owner : {type : Number, unique: true},
    meta : {
        friendsName : [Number],
        friendsCount : Number
    }
});

/**MODEL*/
schemaAnimal.plugin(autoIncrement.plugin, {
    model : 'Animal',
    field : 'animalId',
    startAt : 0,
    incrementBy: 1
});

var Animal = mongoose.model("Animal", schemaAnimal);
schemaAnimal.set('autoIndex', false);

/**IMPORT MODULE*/
module.exports = Animal;

/**METHODS*/
schemaAnimal.statics.findByName = function(name, cb){
    return this.find({name : new RegExp(name, 'i')}, cb);
};

/*
 //Test of creation to populate the database
 var tasty = new User({
 username: "test"
 });

 tasty.save(function(err){
 console.log(tasty.username);
 });*/