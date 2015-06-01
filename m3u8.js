var fs = require('fs');
var util = require('util');
var readline = require('readline');
var EventEmitter = require('events').EventEmitter;


function m3u8_parser(path){
    this.path = path;
    this.json = {segments:[]};
};

util.inherits(m3u8_parser,EventEmitter);

//parse basically m3u8 file to json, need fix to suppport more
//complicate m3u8 format
m3u8_parser.prototype.parse = function(callback){
    var self = this;

    //var buf = fs.readFileSync(dst);
    var st = fs.createReadStream(dst, {flags: 'r'});

    var rl = readline.createInterface({
	input: st,
    });

    rl.on('line', function(line){
	var segment = {};
	if (line.match('^#EXTM3U')) {
	    
	} else if (line.match('^#EXT-X-VERSION')) {
	    var version = line.split(':')[1];
	    console.log("version: " + version);
	    self.json['version'] = version;
	    
	} else if(line.match('^#EXTINF')){
	    var duration = line.split(':')[1];
	    console.log("duration: " + duration);
	    segment['duration'] = duration;
	} else if(line[0] != '#'){
	    var ts_url;
	    ts_url = line;
	    segment['url'] = ts_url;
	    self.json['segments'].push(segment);
	    console.log(ts_url);
	}
    });

    rl.on('close', function(){
	console.log('stream closed');
	self.emit('ready', self.json);
    });
};

m3u8_parser.prototype.play = function play(){
    
};

var dst = '/home/chong/out.m3u8';

var parser = new m3u8_parser(dst);

parser.on('ready', function(json){
    console.log(json);
});

parser.parse();
