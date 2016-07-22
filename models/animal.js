var express = require('express');
var mongoose = require('mongoose')
    , Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment')

var db = mongoose.connection;

autoIncrement.initialize(db);

/**SCHEMA*/
//Animal table
var schemaAnimal = new Schema({
    animalId : {type : Number, unique: true},
    name : String,
    race :  String,
    sex : String,
    picture : String,
    age : {type: Number, min: 0, max: 50},
    bio : String,
    ownerUsername : String,
    meta : {
        friendsName : [Number],
        friendsCount : Number
    }, 
    seq : {type:Number, default:0}
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

schemaAnimal.statics.findById = function(id, cb){
    return this.find({id : new RegExp(name, 'i')}, cb);
};

schemaAnimal.statics.findOneAndUpdate = function(id, cb){
    return this.find({id : new RegExp(name, 'i')}, cb);
};

 /*Test of creation to populate the database
 var tasty = new Animal({
         name : "PotyChien2",
         race : "Chien",
         sex : "Mâle",
         picture : "url",
         age : 15,
         bio : "Test",
         ownerUsername : "do",
         meta : {
             friendsName : [0],
             friendsCount : 0
         }
 });

 tasty.save(function(err){
     if(err) console.log(err);
     else console.log(tasty.name + " a bien été enregistré dans mongoose");
 });*/