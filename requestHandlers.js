var exec = require("child_process").exec;

function start(response) {
	console.log("Request handler 'start' was called");

	exec("find /", function(error, stdout, stderr) {
		handleRequest(response, stdout);
	});
}

function upload(response) {
	console.log("Request handler 'upload' was called");
	handleRequest(response, "Hello Upload");
}

function handleRequest(response, content) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(content);
	response.end();
}

exports.start = start;
exports.upload = upload;

