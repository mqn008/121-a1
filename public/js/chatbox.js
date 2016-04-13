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
    console.log("herlp");
     $('#post').submit(function(){
        //console.log($('#user_input').val());
        // socket.emit sends out chat message events with attached data. In this case the submitted form data from #user.input
        socket.emit('post submit', $('#user_input').val());
        //? $('#tweets').prepend($('<li>').text($('#user_input').val()));
        $('#user_input').val('');
    return false;
    });

     socket.on('new message', function(message_content){
        //console.log('helloooooooooooo from new message socket');
        var parsedData =  message_content;
        $('#tweets').prepend(messageTemplate(message_content));
        console.log('helloooooooooooo from new message socket');
        function messageTemplate(template) {
        var result = '<hr>' + 
            '<div class="icon">' +
                '<img src="' + template.photo + '" alt="">' +
            '</div>' +
            '<div class="deletepost">' + '+' + '</div>' + 
            '<div class="text">' +

                '<span class="username">' + template.user + '</span>' +
                '<span class="at">' + ' @' + template.user + '</span>' +
                '<div class="description">' + template.message + '</div>' + 
                '<b>' + 'listen: ' + '</b>' +
                '<a href="https://www.youtube.com/watch?v=Vhr2mLhmdR4" class="music">'+ 'Steel Reason - FFXIV OST' + '</a>' +
                '</div>' + //for text div
            '<div class="interact">' + 'LIKE DISLIKE COMMENT' + '</div>';
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