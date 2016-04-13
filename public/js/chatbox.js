(function($) {
 
    "use strict";
    var parsedData;
    /* TODO: Start your Javascript code here */
    var socket = io();
    socket.on('sidebar', function(profile){
        var parsedData =  profile;
        //console.log("helloooooooooooo2" + parsedData.photos[0].value);
        
        $('#appenduser').html(messageTemplate(parsedData));
        function messageTemplate(template) {
        var result =
           '<img src="' + template.photos[0].value.replace('_normal','') + '" id="myicon" alt="">' +
            '<div class="myname">' + template.displayName + '</div>' +
            '<div class="myat">' + '@' + template.username + '</div>' +
            '</div>';
        return result;
        }
    });
    
    //console.log("herlp");
    $('#post').submit(function(){
        var show = '';
        //console.log($('#user_input').val());
        // socket.emit sends out chat message events with attached data. In this case the submitted form data from #user.input
        if( $('#user_input').val() == "") return false;
        if( $('#url').val() == '' || $('#title').val() == '') show = "tounshow";
        else show = "toshow";
 
        socket.emit('post submit', {"mesg": $('#user_input').val(), "url": $('#url').val(), "titles": $('#title').val(), "toshow": show});
        $('#user_input').val('');
        $('#url').val('');
        $('#title').val('');

        return false;
    });

    socket.on('new message', function(message_content){
        //console.log('helloooooooooooo from new message socket');
        var parsedData =  message_content;
        var results = messageTemplate(parsedData);

        //console.log(parsedData.url + " and " + parsedData.titles);
        console.log(parsedData);
        console.log(results);

        var results = $(results);
        $('#tweets').prepend(results);

        //console.log('helloooooooooooo from new message socket');

        function messageTemplate(template) {
            var result = '<div class="entry">' +
                '<img src="' + template.photo + '" class="icon"/>' +
                '<div class="text">' +
                    '<span class="name">' + template.displayName + '</span>' +
                    '<span class="at">@' + template.user + '</span>' +
                    '<div class="description">' + template.message + '</div>' +
                    '<div class="' + template.toShow + '"><b>listen:</b> <a href="' + template.url + '" class="music">' + template.titles + '</a></div>' +
                '</div>' + 
                '<div class="clear"></div>' +
            '</div>';

            return result;
        } 

    });
    

})($);

/*
function messageTemplate(template) {
        var result = 
                '<div class="icon">' +
                    '<img src="' + template.photo + '" alt="">' +
                '</div>' +
            '<div class="text">' +

                '<span class="username">' + template.displayName + '</span><br/>' +
                '<span class="at">' + '@' + template.username + '</span><br/>' +
                '<span class="posted">' + template.posted + '</span>' +
                '<div class="description">' + 'helloooooooooooo from template.description' + '</div>' + 
            '</div>' + //for text
            '<div class="message-content">' + template.message +
            '</div>' +
            '<b>listen:</b>' +
            '<a href="https://www.youtube.com/watch?v=Vhr2mLhmdR4" class="music">Steel Reason - FFXIV OST</a>' +
            '<div class="interact">LIKE DISLIKE COMMENT </div>';
        return result;
}

*/