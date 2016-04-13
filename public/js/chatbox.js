(function($) {
 
    "use strict";
    /* TODO: Start your Javascript code here */
    var socket =io();
    socket.on('sidebar', function(profile){
        var parsedData =  profile;
        //$('#sidebar').append($('<li>').html(messageTemplate(parsedData)));
        //function messageTemplate(template) {
        //var result = '<div class="sidebar">' +
            //'<img src="' + template.photos[0].value + '" alt="">' +
           // '</div>';
        //return result;
       // }
    });
        
        /*$('#sidebar').append($('<li>').html(messageTemplate(parsedData)));
=======
 
        $('#sidebar').append($('<li>').html(messageTemplate(parsedData)));
>>>>>>> f099c7c08b1f4b82027ac512603aa6366b71d420
        function messageTemplate(template) {
        var result = '<div class="sidebar">' +
        '<img src="' + template.photos[0].value + '" alt="">' +
         '</div>';
        return result;
<<<<<<< HEAD
        }
    });*/

  /*  $('#post').submit(function(){
=======
       }
    });
 
    $('#send_message').submit(function(){
   
>>>>>>> f099c7c08b1f4b82027ac512603aa6366b71d420
        // socket.emit sends out chat message events with attached data. In this case the submitted form data from #user.input
        socket.emit('chat message', $('#user_input').val());
        
        $('#messages').append($('<li>').text($('#user_input').val()));
        $('#user_input').val('');
     
         $('#messages').append($('<li>').html(messageTemplate(parsedData)));
    return false;
         // grab and parse data and assign it to the parsedData variable.
        //updating new message
        function messageTemplate(template) {
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
       
    });
    socket.on('new message', function(msg){
        var parsedData =  msg;
        $('#messages').append($('<li>').text(msg));
        $('#messages').append($('<li>').html(messageTemplate(parsedData)));
    
        function messageTemplate(template) {
        var result = '<div id="sidebar">' +
            '<div class="myname"> ' +
            '<img src="' + template.photo + '" alt="">' +
            '</div>' +
            '<div class="user-info">' +
            '<span class="username">' + template.user + '</span><br/>' +
            '<span class="posted">' + template.posted + '</span>' +
            '</div>' +
            '</div>' +
            '<div class="message-content">' + template.message +
            '</div>';
        return result;
        }
   
    });
   
   
})($);
