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

var http = require('http');
var fs = require('fs');
var url = require('url');
var url_parts;
var port = 3000;

var server = http.createServer(function(req,res){
	url_parts = url.parse(req.url,true);
	
	if(url_parts.pathname == "/"){
		fs.readFile(__dirname+"/app.html", function(err,data){
			if(err){
				res.writeHead(500);
				return res.end("Error");
			}
			res.writeHead(200);
			res.end(data);
		});
	}
		
	else if(url_parts.pathname == "/controller"){
		fs.readFile(__dirname+"/controller.html",function(err,data){
			if(err){
				res.writeHead(500);
				return res.end("Error");
			}
			res.writeHead(200);
			res.end(data);
		})
	}

});

require('./eventServer').setWebServer(server);

server.listen(port, function(){
	console.log("Server running on port "+port);
});