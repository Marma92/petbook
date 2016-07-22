var LocalStrategy   = require('passport-local').Strategy;

// load up our models
var mongoose = require('mongoose');
var User = require('../models/user');
var Animal = require('../models/animal');
var Post = require('../models/post');


// expose this function to our app using module.exports
module.exports = function(queryMongoose) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    queryMongoose.serializeUser(function(user, done) {
        done(null, user.name);
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    queryMongoose.use(
        'updateAccount',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'firstName',
                passwordField : 'name',
                picField : 'picUser',
                ageFiel : 'age',
                bioField : 'bio',
                mailField : 'mail',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, firstName, name, picUser, age, bio, mail, done) {

                users.findByName(user.name, function(err, users){
                    if (err){
                        return done(null, false, err);
                        console.log("Erreur " + err);
                    } else{
                        console.log('User saved successfully!');
                    }
                    console.log("The user selected is : " + newUser.username);
                    users.firstName = 'username'

                    users.save(function(err){
                        return done(null, false, err);
                        console.log("User updated");
                    });
                });
                return done(null, user);
            })
    );

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    queryMongoose.use(
        'local-login',
        new LocalStrategy({
                // by default, local strategy uses username and password, we will override with email
                usernameField : 'username',
                passwordField : 'password',
                passReqToCallback : true // allows us to pass back the entire request to the callback
            },
            function(req, username, password, done) { // callback with email and password from our form
                connection.query("SELECT * FROM users WHERE username = ?",[username], function(err, rows){
                    if (err)
                        return done(err);
                    if (!rows.length) {
                        return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                    }

                    // if the user is found but the password is wrong
                    if (!bcrypt.compareSync(password, rows[0].password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                    // all is well, return successful user
                    return done(null, rows[0]);
                });
            })
    );
};