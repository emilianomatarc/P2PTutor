$(function(){

    // This demo depends on the canvas element
    if(!('getContext' in document.createElement('canvas'))){
        alert('Sorry, it looks like your browser does not support canvas!');
        return false;
    }

    var doc = $(document);
    var win = $(window);
    var canvas = $('#paper');
    var ctx = canvas[0].getContext('2d');
    ctx.strokeStyle = "black";
    ctx.lineWidth = '2';

    // Generate an unique ID
    var id = Math.round($.now()*Math.random());

    // A flag for drawing activity
    var drawing = false;

    var clients = {};
    var cursors = {};

    var socket = io.connect();
    $('#clear').click(clearCanvas);
    socket.on('moving', function (data) {

        if(! (data.id in clients)){
            // a new user has come online. create a cursor for them
            cursors[data.id] = $('<div class="cursor">').appendTo('#cursors');
        }

        // Move the mouse pointer
        cursors[data.id].css({
            'left' : data.x,
            'top' : data.y
        });
        // Is the user drawing?
        if(data.drawing && clients[data.id]){

            // Draw a line on the canvas. clients[data.id] holds
            // the previous position of this user's mouse pointer

            drawLine(clients[data.id].x, clients[data.id].y, data.x, data.y);
        }

        // Saving the current client state
        clients[data.id] = data;
        clients[data.id].updated = $.now();
    });

    var prev = {};

    canvas.on('mousedown',function(e){
      if (user === ''||(!isConnected&&!isInitiator)) {
        return false;
      }
      e.preventDefault();
      drawing = true;
      prev.x = e.pageX-canvas.offset().left;
      prev.y = e.pageY-canvas.offset().top;
    });

    doc.bind('mouseup mouseleave',function(){
        drawing = false;
    });

    var lastEmit = $.now();

    canvas.on('mousemove',function(e){
        var tox=e.pageX-canvas.offset().left;
        var toy=e.pageY-canvas.offset().top;
        if($.now() - lastEmit > 30){
            socket.emit('mousemove',{
                'x': tox,
                'y': toy,
                'drawing': drawing,
                'id': id,
                'roomid': roomid
            });
            lastEmit = $.now();
        }
        // Draw a line for the current user's movement, as it is
        // not received in the socket.on('moving') event above
        if(drawing){
            drawLine(prev.x, prev.y, tox, toy);
            prev.x = tox;
            prev.y = toy;
        }
    });

    // Remove inactive clients after 10 seconds of inactivity
    setInterval(function(){
        for(ident in clients){
            if($.now() - clients[ident].updated > 5000){

                // Last update was more than 10 seconds ago.
                // This user has probably closed the page
                cursors[ident].remove();
                delete clients[ident];
                delete cursors[ident];
            }
        }

    },5000);
    //a method to resize the whiteboard, but not adopted
    // win.resize(respondCanvas);

    // function respondCanvas(){ 
    //     canvas.attr('width', $('#remoteVideo').width()); //max width
    //     canvas.attr('height', $('#remoteVideo').height()); //max height

    //     //Call a function to redraw other content (texts, images etc)
    // }
    // respondCanvas();

    function drawLine(fromx, fromy, tox, toy){
      ctx.beginPath();
      ctx.moveTo(fromx, fromy);
      ctx.lineTo(tox, toy);
      ctx.stroke();
    }

    function clearCanvas(){
      ctx.clearRect(0,0,canvas.width(), canvas.height());
    }

});


