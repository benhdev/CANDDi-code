var pageInfo = "";
var emailInfo = "";
var prompt = require("prompt");

var pattern = /(https?:\/\/|www\.|[-a-zA-Z0-9@:%._\+~#=]+\@)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9:%_\+.~#?&//=]*)/g ;
var eregx = new RegExp(pattern, "g");

// Implementation of the web crawler
var crawler = require("crawler");
var cr = new crawler({
	maxConnections : 10,
	
	callback : function(error, res, done) {
		if(error) {
			console.log(error);
		} else {
			var $ = res.$;
			var result;
			var resCount = 0;
			while(result = eregx.exec($("html").text())) {
				var match = result[0];
				console.log(match);
			}			
		}
		done();
	}
});

const http = require("http");
const https = require("https");

const hostname = "127.0.0.1";
const port = 3000;

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
	
	if(emailInfo != "") {
		var emailDomain = emailInfo.substring(emailInfo.search("@") + 1);
		
		if(pageInfo != "") {
			var checked = [];
			cr.queue("https://www." + emailDomain);
		}
		
		const req = https.request("https://www." + emailDomain, (res) => {  
			res.on("data", function(data) {
				pageInfo += data;
			});
		});
		
		req.end();
	}
	res.end(emailInfo + "\n \n" + pageInfo);
});



server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
	
	prompt.start();

	prompt.get(["email"], function (err, result) {
		emailInfo = result.email;
	});
});
