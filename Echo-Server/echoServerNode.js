/*
The MIT License (MIT)

Copyright (c) 2015 Hoai Viet Nguyen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

var http = require("http");
var fs = require('fs');
var WebSocketServer = require('websocket').server;
var httpServer = http.createServer(function(req,res){
	fs.readFile(__dirname+"/index.html",function(err,data){
		if(err){
			res.writeHead(500);
			return res.end("Error");
		}
		res.writeHead(200);
		res.end(data);
	});
});

var wsServer = new WebSocketServer({
	httpServer:httpServer,
	autoAcceptConnections:false
});


wsServer.on("request",function(req){

	
	var connection = req.accept();

	/*
		Connection-Object functions:

		sendUTF( string )
		sendBytes( buffer )

		Documentation:
		https://github.com/Worlize/WebSocket-Node/wiki/Documentation

	*/

	connection.on("message",function(message){
		/*
			
			Message-Object in WebSocket-Node

			For Text Frames:
			{
    			type: "utf8",
    			utf8Data: "A string containing the received message."
			}

			 For Binary Frames:
			{
    			type: "binary",
    			binaryData: binaryDataBuffer 
			}

		*/

		if(message.type == "utf8"){
			//Code here ...
		
		}


	});

	connection.on("close",function(message){

	});

});

httpServer.listen(3000,function(){
	console.log("Server running on port", httpServer.address().port);
})

