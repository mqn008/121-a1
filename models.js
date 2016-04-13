var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
	"twitterID": String,
	"token": String,
    "username": String,
    "displayName": String,
    "photo": String,
    "date": Date
});

var newsFeedSchema = mongoose.Schema({
    "user": String,
    "photo": String,
    "message": String,
    "posted": Date,
    "displayName": String
});

exports.User = mongoose.model('users', userSchema);
exports.newsFeed = mongoose.model('newsfeed',newsFeedSchema);
