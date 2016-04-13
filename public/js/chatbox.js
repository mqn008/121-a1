(function($) {
    "use strict";
    /* TODO: Start your Javascript code here */
    var socket = io();
    socket.on('sidebar', function(profile){
        var parsedData =  profile;
        console.log("helloooooooooooo2");
        console.log("helloooooooooooo" + parsedData);
        //$('#sidebar').append($('<li>').html(messageTemplate(parsedData)));
        //function messageTemplate(template) {
        //var result = '<div class="sidebar">' +
            //'<img src="' + template.photos[0].value + '" alt="">' +
           // '</div>';
        //return result;
       // }
    });

    $('#send_message').submit(function(){
        // socket.emit sends out chat message events with attached data. In this case the submitted form data from #user.input
        socket.emit('chat message', $('#user_input').val());
        //$('#messages').append($('<li>').text($('#user_input').val()));
        $('#user_input').val('');
        console.log("hello");
         //$('#messages').append($('<li>').html(messageTemplate(parsedData)));
    return false;
         // grab and parse data and assign it to the parsedData variable.
        //updating new message
        /*function messageTemplate(template) {
        var result = '<div class="user">' +
            '<div class="user-image">' +
            '<img src="' + template.photo + '" alt="">' +
            '</div>' +
            '<div class="user-info">' +
            '<span class="username">' + template.username + '</span><br/>' +
            '<span class="posted">' + template.posted + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="message-content">' + $('#user_input').val() +
            '</div>';

            return result;
        }
        */
    });
    socket.on('new message', function(msg){
        var parsedData =  msg;
        //$('#messages').append($('<li>').text(msg));
        $('#messages').append($('<li>').html(messageTemplate(parsedData)));
        console.log("helloooooooooooo " + parsedData.message)
        function messageTemplate(template) {
        var result = '<div id="sidebar">' +
            '<div class="myname"> ' +
            '<img src="' + template.photo + '" alt="">' +
            '</div>' +
            '<div class="user-info">' +
            '<span class="username">' + template.user + '</span><br/>' +
            //'<span class="posted">' + template.posted + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="message-content">' + template.message +
            '</div>';
        return result;
        }
   
    });
   
   
})($);
