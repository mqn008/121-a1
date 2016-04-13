var models = require("../models");

exports.view = function(req, res) {
	var data = {newsfeed: [],user: []};
	models.newsFeed.find(function(err,newsfeed1){
		if(err) return console.log(err);
		data.newsfeed = newsfeed1;
		data.user = global.myuser.get('myuser');
		res.render('chat',data);
	});
 	/*var data = {users: []};
 	models.User.findOne({"twitterID":};function(err,user){
 		if(err) return console.log(err);
 		data.users = user;
 		res.render('chat',data);
 	});*/
	//console.log("------------start---------------------------------");
	//console.log(data);

    
};
