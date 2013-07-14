//var exec = require("child_process").exec;
var querystring = require("querystring")
	fs = require("fs"),
	formidable = require("formidable");

function start(response) {
	console.log("Request handler 'start' was called");

	var body = '<html>'+
		'<head>'+
		'<meta http-equiv="Content-Type" '+
		'content="text/html; charset=UTF-8" />'+
		'</head>'+
		'<body>'+
		'<form action="/upload" enctype="multipart/form-data" '+
		'method="post">'+
		'<input type="file" name="upload">'+
		'<input type="submit" value="Upload file" />'+
		'</form>'+
		'</body>'+
		'</html>';

/*
	exec("ls -ltr", function(error, stdout, stderr) {
		handleRequest(response, stdout);
	});
*/
	response.write(body);
}

function upload(response, request) {
	console.log("Request handler 'upload' was called");

	var form = new formidable.IncomingForm();
	form.uploadDir = ".";
	console.log("About to parse");

	form.parse(request, function(error, fields, files) {
		console.log("parsing done");
		fs.renameSync(files.upload.path, "test.png");
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write("received image:<br/>");
		response.write("<img src='/show' />");
		response.end();
	});
}

function show(response) {
	console.log("Request handler 'show' was called.");

	fs.readFile("test.png", "binary", function(error, file) {
		if(error) {
			response.writeHead(500, {"Content-Type": "text/plain"});
			response.write(error + "\n");
			response.end();
		} else {
			response.writeHead(200, {"Content-Type": "image/png"});
			response.write(file, "binary");
			response.end();
		}
	});
}

function handleRequest(response, content) {
	response.writeHead(200, {"Content-Type": "text/plain"});
	response.write(content);
	response.end();
}

exports.start = start;
exports.upload = upload;
exports.show = show;
