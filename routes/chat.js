var models = require("../models");


exports.view = function(req, res) {
	var data = {user: []};
	models.newsFeed.find().where('user').equals(req.session.passport.user.username).sort({posted: 'desc'}).exec(function(err,newsfeed2){
	
	data = newsfeed2;
	
	});

	models.newsFeed.find(function(err,newsfeed2){
		if(err) return console.log(err);
	}).sort({posted: 'desc'}).exec(renderProjects);
	//console.log("------------start---------------------------------");
	//console.log(data);
	function renderProjects(err, newsfeed2) {
        res.render('chat', { 'newsfeed2': newsfeed2, 'sidedata': data });
        //'newsfeed' is the one for the chat.handlebars
        // the :newsfeed is passing the entire sorted collection to 'newsfeed'
    };
 
};
