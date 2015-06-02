var util = require('util');
var spawn = require('child_process').spawn;
var path = require('path');

var cmd = 'ffmpeg';

var convert = '-y -i %s -vcodec libx264  -r 25 -profile:v baseline -b:v 1500k -maxrate 2000k  -map 0 -flags -global_header -f segment -segment_list %s/ts/%s.m3u8 -segment_time 10 -segment_format mpeg_ts -segment_list_type m3u8  %s/ts/%s%03d.ts';

if (!process.argv[2]) {
    console.log("node video_to_segments.js video path");
    return -1;
}

var path_raw = path.parse(process.argv[2]);

console.log("log"+ path_raw['name']);
var args = util.format(convert, process.argv[2],
		      path_raw['dir'], path_raw['name'],
		      path_raw['dir'], path_raw['name']);


var convert_process = spawn(cmd, args.split[' ']);


convert_process.on('exit', function(code){
    if (code == 0)
	console.log("convert complete");
    
});

console.log("cmd: " + cmd);

