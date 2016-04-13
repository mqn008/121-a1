var models = require("../models");

exports.view = function(req, res) {
	var data = {newsfeed: [],user: []};
	models.newsFeed.find(function(err,newsfeed1){
		if(err) return console.log(err);
	}).sort({created: 'desc'}).exec(renderProjects);
	//console.log("------------start---------------------------------");
	//console.log(data);
	function renderProjects(err, newsfeed1) {
        res.render('chat', { 'newsfeed': newsfeed1 });
        //'newsfeed' is the one for the chat.handlebars
        // the :newsfeed is passing the entire sorted collection to 'newsfeed'
    };
 
};
