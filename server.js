// Node.js Dependencies
const express = require("express");
var handlebars  = require('express-handlebars');
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const passport = require("passport"), TwitterStrategy = require('passport-twitter').Strategy;
const dotenv = require("dotenv");
require("dotenv").load();
var models = require("./models");


const mongoose = require("mongoose");
var db = mongoose.connection;

var router = {
	index: require('./routes/index'),
	chat: require('./routes/chat')
}

var parser = {
    body: require("body-parser"),
    cookie: require("cookie-parser")
};

// Database Connection
var db = mongoose.connection;
 var credentials = require('./credentials.js');
 var opts = {
	server: {
		socketOptions: { keepAlive: 1 }
	}
};

 mongoose.connect(credentials.mongo.development.connectionString, opts);
 db.on('error', console.error.bind(console, 'Mongo DB Connection Error:'));
 db.once('open', function(callback) {
     console.log("Database connected successfully.");

 });

// session middleware
var session_middleware = session({
    key: "session",
    secret: "4fa238c5d0d632881b6786f3b2d944950169948f",
    saveUninitialized: true,
    resave: true,
    store: new MongoStore({ mongooseConnection: db })
});

// Middleware

app.set("port", process.env.PORT || 3000);
app.engine('handlebars', handlebars());
app.set("view engine", "handlebars");
app.set("views", __dirname + "/views");
app.use(express.static(path.join(__dirname, "public")));
app.use(parser.cookie());
app.use(parser.body.urlencoded({ extended: true }));
app.use(parser.body.json());
app.use(require('method-override')());
app.use(session_middleware);
/* TODO: Passport Middleware Here*/

app.use(passport.initialize());
app.use(passport.session());
/* TODO: Use Twitter Strategy for Passport here */

passport.use(new TwitterStrategy({
    consumerKey: "iW8dxcQPLjVogd4noFqhVWCQZ",
    consumerSecret: "KQRckBG7Lu64VdIxmbdOKcCHmBhzpnKnUKqtbfm0p5gDFzoCNi",
    callbackURL: "/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    models.User.findOne({"twitterID": profile.id}, function(err, user) {
    	if(err){
    		console.log("something wrong with db");
    	}
      // (1) Check if there is an error. If so, return done(err);
    	if(!user) {
    		var date = new Date().toLocaleString('en-US');

        	var user = new models.User({
        		"twitterID": profile.id,
        		"token": token, 
   				"username": profile.username,
    			"displayName": profile.displayName,
    			"photo": profile.photos[0].value.replace('_normal',''),
    			"date": date
        	});

        	user.save(afterSaving);
        	function afterSaving(err){
        		return done(null, profile);
        	}        	
    	} else {
    		 // (3) since the user is found, update user’s information
        	process.nextTick(function() {
        	var date = new Date().toLocaleString('en-US');

        	console.log();
        	user.update({
        		username: profile.username,
        		displayName: profile.displayName,
    			photo: profile.photos[0].value.replace('_normal',''),
    			date: date},afterUpdating);
        	function afterUpdating(err){
        		return done(null, profile);
        	}
        	});
    	}
        app.set('myuser',user);
        });
  }
));
/* TODO: Passport serialization here */

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});
// Routes
/* TODO: Routes for OAuth using Passport */
app.get("/", router.index.view);
app.get("/chat", router.chat.view);
// More routes here if needed

app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback',
  passport.authenticate('twitter', { successRedirect: '/chat',
                                     failureRedirect: '/' }));
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

io.use(function(socket, next) {
    session_middleware(socket.request, {}, next);
});

/* TODO: Server-side Socket.io here */
io.on('connection', function(socket){
    var clientUser = socket.request.session.passport.user;
	socket.emit('sidebar', clientUser);
    //socket.on looks to receive "post submit events being emitted from the client"
  	socket.on('post submit', function(msg){
    
  	var clientUser = socket.request.session.passport.user;
    try{ 
    	var date = new Date().toLocaleString('en-US');
    	var message = new models.newsFeed({
    		"user": clientUser.username,
    		"photo": clientUser.photos[0].value,
    		"message": msg,
    		"posted": date,
            "displayName": clientUser.displayName
    	});

    	

    message.save();
    //console.log("before emitting newsfeed signal") ;
    socket.emit("new message", message);


    }
    catch(err){
    	console.log("error at socket.on:"  + err);
    }
	});

});
// socket.on looks to receive "newsfeed events being emitted from the client"


// Start Server
http.listen(app.get("port"), function() {
    console.log("Express server listening on port " + app.get("port"));
});
