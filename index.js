const core = require('@actions/core');
const child_process = require('child_process');
const https = require('https');
const http = require('http');
const os = require('os');
const fs = require('fs');
const sh = require("shelljs");

var download = function(url, dest, cb) {
  if (url.search(/https/i) == 0) {
    var http_client = https
  } else {
    var http_client = http
  }

  var file = fs.createWriteStream(dest);
  var request = http_client.get(url, function(response) {
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
  current_dir = sh.pwd();

  if (os_platform == "darwin") {
    var ossutil_url = 'http://gosspublic.alicdn.com/ossutil/1.6.10/ossutilmac64';
    var ossutil_bin = `${current_dir}/entrypoint.sh`;
  } else if (os_platform == "linux") {
    var ossutil_url = 'http://gosspublic.alicdn.com/ossutil/1.6.10/ossutil64';
    var ossutil_bin = `${current_dir}/entrypoint.sh`;
  } else {
    // for windows
    var ossutil_url = 'https://nordata-cdn.oss-cn-shanghai.aliyuncs.com/choppy/ossutil64.exe';
    var ossutil_bin = `${current_dir}\entrypoint.bat`;
  }

  console.log(`Get ossutil from ${ossutil_url} for ${os_platform}!`);
  download(ossutil_url, 'ossutil');

  // Run batch program
  console.log("Running entrypoint.[sh|bat]...")
  out = child_process.spawnSync(`${ossutil_bin}`, [`${ossArgs}`, `${accessKey}`, `${accessSecret}`, `${endpoint}`], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'pipe',
    encoding: 'utf-8'
  });

  console.log(out.output);

  core.setOutput("command", `ossutil ${ossArgs}`);
} catch (error) {
  core.setFailed(error.message);
  console.log(error);
}