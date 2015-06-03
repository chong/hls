var util = require('util');
var spawn = require('child_process').spawn;
var path = require('path');

var cmd = 'ffmpeg';

var convert = '-y -i %s -s 368x208 -b 1500 -map 0 -flags -global_header -f segment -segment_list %s/ts/%s.m3u8 -segment_time 10 -segment_format mpeg_ts -segment_list_type m3u8 %s/ts/%s_%03d.ts';

if (!process.argv[2]) {
    console.log("node video_to_segments.js video path");
    return -1;
}

var path_raw = path.parse(process.argv[2]);

console.log("log"+ path_raw['name']);
var args = util.format(convert, process.argv[2],
		      path_raw['dir'], path_raw['name'],
		      path_raw['dir'], path_raw['name']);

console.log("args:::::" + args.split(' '));

var convert_process = spawn(cmd, args.split(' '));

convert_process.stdout.on('data', function (data) {
  console.log('stdout: ' + data);
});

convert_process.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

convert_process.on('exit', function(code){
    if (code != 0)
        console.log("error reture code " + code);
    if (code == 0)
	console.log("convert complete");
    
});

console.log("cmd: " + cmd + args);

