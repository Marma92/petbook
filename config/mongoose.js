/*var express = require('express');
var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

mongoose.connect("mongodb://localhost:27017/petbookDB");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
       console.log("Connection succeeded to MongoDB.");
    });

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

//Post table
var schemaPost = new Schema({
   postId : {type : Number, unique: true},
   title : String,
   author : String,
   content : String,
   link : String,
   publishedDate : { type: Date, default: Date.now },
   comments : [{
       content: String,
       publishedDate: {type: Date, default: Date.now}
   }],
   meta : {
       likes : Number,
       shares : Number
   },
   hidden : Boolean
});

//Post table
var schemaComment = new Schema({
   postId : {type : Number, unique: true},
   title : String,
   author : String,
   content : String,
   link : String,
   publishedDate : { type: Date, default: Date.now },
   comments : [{
      content: String,
      publishedDate: {type: Date, default: Date.now}
   }],
   meta : {
      likes : Number,
      shares : Number
   },
   hidden : Boolean
});

/**MODELS*//*
var User = mongoose.model("User", schemaUser);
var Animal = mongoose.model("Animal", schemaAnimal);
var Post = mongoose.model("Post", schemaPost);
var Comment = mongoose.model("Comment", schemaComment);

schemaPost.set('autoIndex', false);
schemaUser.set('autoIndex', false);
schemaAnimal.set('autoIndex', false);
schemaComment.set('autoIndex', false);

/**IMPORTS MODULES*//*
module.exports = User;
module.exports = Animal;
module.exports = Post;
module.exports = Comment;

/**METHODS*/
//Methods for User
/* chemaUser.statics.findByName = function(name, cb){
   return this.find({username : new RegExp(name, 'i')}, cb);
};

//Test of creation to populate the database
var tasty = new User({
username: "test"
});

tasty.save(function(err){
   console.log(tasty.username);
});

var nanimo = new Animal({
   name: "patypotah"
});

nanimo.save(function(err){
   console.log(nanimo.name);
});
*/