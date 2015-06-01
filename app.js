var express = require('express');
var app = express();
var fs = require('fs');
var path = require('path');

var config_path = path.join(__dirname, "config.json");

var config = JSON.parse(fs.readFileSync(config_path));

console.log(config.video_path);

function setHeaders(res, path){
    if (path.match('.*.ts'))
	res.setHeader('Content-Type', 'application/x-mpegurl');
    else if(path.match('.*.m3u8'))
	res.setHeader('Content-Type', 'video/mp2t');
};

app.use(express.static(config.video_path, {setHeaders: setHeaders}));

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
