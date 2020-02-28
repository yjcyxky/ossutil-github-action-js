const core = require('@actions/core');
const child_process = require('child_process');
const http = require('http');
const os = require('os');
const fs = require('fs');
const sh = require("shelljs");

var download = function(url, dest, cb) {
  var file = fs.createWriteStream(dest);
  var request = http.get(url, function(response) {
    response.pipe(file);
    file.on('finish', function() {
      file.close(cb);  // close() is async, call cb after close completes.
    });
  }).on('error', function(err) { // Handle errors
    fs.unlink(dest); // Delete the file async. (But we don't check the result)
    if (cb) cb(err.message);
  });
};


try {
  const ossArgs = core.getInput('ossArgs');
  const accessKey = core.getInput('accessKey');
  const accessSecret = core.getInput('accessSecret');
  const endpoint = core.getInput('endpoint');
  const os_platform = os.platform();
  console.log(os_platform);

  if (os_platform == "darwin") {
    var ossutil_url = 'http://gosspublic.alicdn.com/ossutil/1.6.10/ossutilmac64';
    var ossutil_bin = 'entrypoint.sh';
  } else if (os_platform == "linux") {
    var ossutil_url = 'http://gosspublic.alicdn.com/ossutil/1.6.10/ossutil64';
    var ossutil_bin = 'entrypoint.sh';
  } else {
    // for windows
    var ossutil_url = 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/ossutil64.exe';
    var ossutil_bin = 'entrypoint.bat';
  }

  console.log(`Get ossutil from ${ossutil_url} for ${os_platform}!`);
  download(ossutil_url, 'ossutil');

  current_dir = sh.pwd();
  // Run batch program
  let out = child_process.spawnSync(`${current_dir}/${ossutil_bin}`, [`${ossArgs}`, `${accessKey}`, `${accessSecret}`, `${endpoint}`]);
  console.log('status: ' + out.status);
  console.log('stdout: ' + out.stdout.toString('utf8'));
  console.log('stderr: ' + out.stderr.toString('utf8'));

  core.setOutput("command", `ossutil ${ossArgs}`);
} catch (error) {
  core.setFailed(error.message);
  console.log(error);
}