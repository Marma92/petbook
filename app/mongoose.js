var mongoose = require('mongoose');
var Schema = require('mongoose').Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

//Connection
mongoose.connect('mongodb://localhost/petbookdb');

//User table
var schemaUser = new Schema ({
    _id : ObjectId,
    userId : {type : Number, unique: true},
    firstName : String,
    name : String,
    picture : String,
    age : {type: Number, min: 18, max: 50},
    bio : String,
    meta : {
        friends : Number
    }
});

//Post table
var schemaPost = new Schema({
    _id : ObjectId,
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

//Models
var User = mongoose.model("User", schemaUser);
var Post = mongoose.model("Post", schemaPost);

schemaPost.set('autoIndex', false);
schemaUser.set('autoIndex', false);

//Methods for User
schemaUser.statics.findByName = function(name, cb){
    return this.find({name : new RegExp(name, 'i')}, cb);
};

test.save(function(err){
    console.log(test.name);
});

User.find(function(err, Users){
    console.log(Users);
});

User.find().findByName('Niel').exec(function(err, users){
    console.log(users);
});

//Methods for Post
Post.save(function(err){
    console.log("New post saved");
});

Post.find(function(err, Posts){
    console.log(Posts);
});

//Test of creation to populate the database
var test = new User({
    userId : 1,
    firstName : "test",
    name : "test",
    age : 20,
    bio : "Recherche labrador"
});
