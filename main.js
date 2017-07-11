var pageInfo = "";
var emailInfo = "";
var prompt = require('prompt');

prompt.start();

prompt.get(['email'], function (err, result) {
	emailInfo = result.email;
});

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const req = http.request("http://teamupgrade.co.uk/", (res) => {  
	res.on('data', function(data) {
		pageInfo += data;
	});
});

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader("Content-Type", "text/plain");
  
	res.end(emailInfo + "\n \n" + pageInfo); 
  
});

req.end()

server.listen(port, hostname, () => {
//	console.log(`Server running at http://${hostname}:${port}/`);
});
