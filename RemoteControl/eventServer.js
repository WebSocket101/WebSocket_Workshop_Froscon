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

var WebSocketServer = require('websocket').server;
var crypto = require('crypto');
var base64url = require('base64url');
//Speichere alle Websockets der App hier ab
var connections = {};

module.exports.setWebServer = function(server){
	var wsServer = new WebSocketServer({
	httpServer:server,
	autoAcceptConnections:false
	});

	wsServer.on("request",function(req){
		if(req.resource == "/" || req.resource == "" || typeof req.resource === "undefined"){
			var connection = req.accept();
			try {
				//Generiere Session-Id
				var sid = base64url(crypto.randomBytes(16));
				connection.sid = sid;
				connections[sid] = connection;
				var event = {type:"sid",sid:sid}
				connection.sendUTF(JSON.stringify(event));
			} catch (ex) {
			  // handle error
			}

			connection.on("close",function(){
				delete connections[connection.sid];
			})
		}
		else if(req.resourceURL.pathname == "/controller"){
			var connection = req.accept();
			//TODO Finde den passenden WebSocket anhand der Session-Id
			//TODO Leite die Befehle des Controlles an die App weiter

		}
		else{
			req.reject();
		}
	});
}

