(function($) {
 
    "use strict";
    var parsedData;
    /* TODO: Start your Javascript code here */
    var socket = io();
    socket.on('sessions', function(profile){
        parsedData = profile;
        console.log("herlp");
        console.log(parsedData);
    });

    $('#post').submit(function(e) {
        e.preventDefault();
        console.log('DEEEEERP');
        if( $('#user_input').val() == "") return false;

        socket.emit('chat message', {"msg": $('#user_input').val(), "url": $('#url').val(), "titles": $('#title').val()});
        $('#user_input').val('');
        $('#url').val('');
        $('#title').val('');

        if( $('#url').val() == '' || $('#title').val() == '' ) {
            $('#tweets').prepend(messageTemplate2(parsedData));
        }

        else $('#tweets').prepend(messageTemplate(parsedData));
        
        console.log("HELP");
        return false;

        function messageTemplate(template) {
            var result = '<div class="entry">'+
            '<img src="' + template.photo + '" class="icon"/>' +
            '<div class="text">' +
                '<span class="name">' + template.username + '</span>' +
                '<span class="at">@' + template.username + '</span>' +
                '<div class="description">' + $('user_input').val() + '</div>' +
                '<b>listen:</b> <a href="' + $('#url').val() + 
                '" class="music">' + $('#title').val() +'</a>' +
                '</div>' +
                '<div class="interact">' +
                    'LIKE DISLIKE COMMENT' +
                '</div>' +
            '</div>';

            return result;
        }

        function messageTemplate2(template) {
            var result = '<div class="entry">'+
            '<img src="' + template.photo + '" class="icon"/>' +
            '<div class="text">' +
                '<span class="name">' + template.username + '</span>' +
                '<span class="at">@' + template.username + '</span>' +
                '<div class="description">' + $('user_input').val() + '</div>' +
                '<div class="interact">' +
                    'LIKE DISLIKE COMMENT' +
                '</div>' +
            '</div>';

            return result;
        }
    });
})($);