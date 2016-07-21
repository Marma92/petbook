var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/petbookDB");

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
       console.log("Connection succeeded.");
    });

var Schema = mongoose.Schema;

/**SCHEMAS*/
//User table
var schemaUser = new Schema ({
   //_id : ObjectID,
   userId : {type : Number, unique: true},
   firstName : String,
   name : String,
   login : String,
   picture : String,
   age : {type: Number, min: 18, max: 50},
   bio : String,
   meta : {
       animals : Number
   }
});

//Animal table
var schemaAnimal = new Schema({
   //_id : ObjectId,
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
   //_id : ObjectId,
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

/**MODELS*/
var User = mongoose.model("User", schemaUser);
var Animal = mongoose.model("Animal", schemaAnimal);
var Post = mongoose.model("Post", schemaPost);

schemaPost.set('autoIndex', false);
schemaUser.set('autoIndex', false);
schemaAnimal.set('autoIndex', false);

/**IMPORTS MODULES*/
module.exports.schemaUser = schemaUser;
module.exports.schemaAnimal = schemaAnimal;
module.exports.schemaPost = schemaPost;


/**METHODS*/
//Methods for User
schemaUser.statics.findByName = function(name, cb){
   return this.find({name : new RegExp(name, 'i')}, cb);
};

//Need a function to auto increment the id
function getNextSequenceValue(sequenceName){
   var sequenceId = db.schemaUser.findAndModify({
      query:{_id: sequenceName },
      update: {$inc:{sequence_value:1}},
      new:true
   });

   return sequenceId.sequence_value;
}

//Test of creation to populate the database
var user = new User({
   firstName : "Dorine",
   name : "Niel",
   login : "do",
   picture : "",
   age : "20",
   bio : "Ta mère !",
   meta : {
       animals : 1
   }
});

user.save(function(err){
   console.log(user.name);
});

db.animal.insert({_id:"userId", sequence_value:0});

//Test of creation to populate the database
var animal = new Animal({
   animalId: getNextSequenceValue("animalId"),
   name : "Potycha",
   race :  "Chat",
   sex : "Femelle",
   picture : "",
   age : 3,
   bio : "Kiffe les pants",
   owner : user.userId,
   meta : {
       friendsName : 0,
       friendsCount : 0
   }
});

animal.save(function(err){
   console.log(animal.name);
});

//Test of creation to populate the database
var post = new Post({
   title : "Mon article sur la vie trépidante des loutres",
   author : user.login,
   content : "Les loutres ont une vie absolument passionnante mais se droguent beaucoup trop.",
   link : "",
   publishedDate : Date.now(),
   meta : {
       likes : 0,
       shares : 0
   },
   hidden : true
});

post.save(function(err){
   console.log(post.title);
});
