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

/**MODEL*/
schemaPost.plugin(autoIncrement.plugin, {
    model : 'Post',
    field : 'postId',
    startAt : 0,
    incrementBy: 1
});

var Post = mongoose.model("Post", schemaPost);
schemaPost.set('autoIndex', false);

/**IMPORT MODULE*/
module.exports = Post;

/**METHOD*/
schemaPost.statics.findByName = function(name, cb){
    return this.find({title : new RegExp(name, 'i')}, cb);
};

/*
 //Test of creation to populate the database
 var tasty = new User({
 username: "test"
 });

 tasty.save(function(err){
 console.log(tasty.username);
 });*/